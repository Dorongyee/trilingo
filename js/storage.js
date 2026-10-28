// 저장소: 기본은 localStorage(기기별). TL_CONFIG.firebase 가 있으면 Firestore 로 가족 동기화.
// Firestore 무료 한도(일 쓰기 2만/읽기 5만)를 아끼기 위해:
//   - 사용자 1명 = 문서 1개 (프로필 + 전체 학습 기록을 한 문서에 압축 저장)
//   - 쓰기는 2.5초 디바운스(연속 조작을 한 번에), 화면을 떠날 때 즉시 flush
//   - 읽기는 사용자 선택 시 1회, 홈 화면에서 가족 목록 1회
window.Store = (function () {
  const LS = window.localStorage;
  const K = { users: "tl.users", cur: "tl.current", prog: (id) => "tl.prog." + id };
  let mode = "local", db = null, family = null;
  const timers = {}, pending = {};

  function lsGet(k, d) { try { const v = LS.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsSet(k, v) { try { LS.setItem(k, JSON.stringify(v)); } catch (e) { console.warn("localStorage 저장 실패", e); } }
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  }

  async function init() {
    const cfg = window.TL_CONFIG || {};
    if (cfg.firebase && cfg.firebase.projectId) {
      try {
        const v = "10.14.1";
        await loadScript(`https://www.gstatic.com/firebasejs/${v}/firebase-app-compat.js`);
        await loadScript(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore-compat.js`);
        firebase.initializeApp(cfg.firebase);
        db = firebase.firestore();
        family = cfg.familyCode || "family";
        mode = "cloud";
      } catch (e) {
        console.warn("Firebase 초기화 실패 → 로컬 모드", e);
        mode = "local";
      }
    }
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flushAll(); });
    window.addEventListener("pagehide", flushAll);
    return mode;
  }
  const col = () => db.collection("families").doc(family).collection("users");

  function emptyProg() { return { learned: {}, stats: {}, xp: 0, tests: [], songs: {}, last: null, updated: 0 }; }

  // 두 기기의 기록을 합칩니다(학습 완료는 합집합, 정답/오답 수는 큰 값, XP는 큰 값).
  function mergeProg(a, b) {
    a = a || emptyProg(); b = b || emptyProg();
    const m = emptyProg();
    for (const src of [a, b]) {
      for (const [id, ts] of Object.entries(src.learned || {})) m.learned[id] = m.learned[id] ? Math.min(m.learned[id], ts) : ts;
      for (const [id, st] of Object.entries(src.stats || {})) {
        const cur = m.stats[id] || [0, 0, 0];
        m.stats[id] = [Math.max(cur[0], st[0] || 0), Math.max(cur[1], st[1] || 0), Math.max(cur[2], st[2] || 0)];
      }
      for (const [sid, sv] of Object.entries(src.songs || {})) {
        const cur = m.songs[sid] || { lines: {}, lyrics: "", lyricsAt: 0 };
        Object.assign(cur.lines, sv.lines || {});
        if ((sv.lyricsAt || 0) >= (cur.lyricsAt || 0) && sv.lyrics !== undefined) { cur.lyrics = sv.lyrics || ""; cur.lyricsAt = sv.lyricsAt || 0; }
        m.songs[sid] = cur;
      }
    }
    const seen = new Set();
    m.tests = [...(a.tests || []), ...(b.tests || [])].filter((t) => { if (seen.has(t.d)) return false; seen.add(t.d); return true; }).sort((x, y) => x.d - y.d).slice(-100);
    m.xp = Math.max(a.xp || 0, b.xp || 0);
    m.last = (a.updated || 0) >= (b.updated || 0) ? (a.last || b.last) : (b.last || a.last);
    m.updated = Math.max(a.updated || 0, b.updated || 0);
    return m;
  }

  async function getUsers() {
    let users = lsGet(K.users, []);
    if (mode === "cloud") {
      try {
        const snap = await col().get();
        const cloud = snap.docs.map((d) => ({ ...(d.data().profile || {}), id: d.id })).filter((u) => u.name);
        const map = new Map(users.map((u) => [u.id, u]));
        for (const u of cloud) { const l = map.get(u.id); map.set(u.id, !l || (u.updated || 0) >= (l.updated || 0) ? u : l); }
        users = [...map.values()];
        lsSet(K.users, users);
      } catch (e) { console.warn("가족 목록 읽기 실패", e); }
    }
    return users.sort((a, b) => (a.created || 0) - (b.created || 0));
  }
  async function saveUser(user) {
    user.updated = Date.now();
    const users = lsGet(K.users, []);
    const i = users.findIndex((u) => u.id === user.id);
    if (i >= 0) users[i] = user; else users.push(user);
    lsSet(K.users, users);
    if (mode === "cloud") { try { await col().doc(user.id).set({ profile: user }, { merge: true }); } catch (e) { console.warn(e); } }
  }
  async function deleteUser(id) {
    lsSet(K.users, lsGet(K.users, []).filter((u) => u.id !== id));
    LS.removeItem(K.prog(id));
    if (lsGet(K.cur) === id) LS.removeItem(K.cur);
    if (mode === "cloud") { try { await col().doc(id).delete(); } catch (e) { console.warn(e); } }
  }
  function peekProgress(id) { return lsGet(K.prog(id), null) || emptyProg(); }
  async function getProgress(id) {
    let p = lsGet(K.prog(id), null);
    if (mode === "cloud") {
      try {
        const d = await col().doc(id).get();
        if (d.exists && d.data().progress) { p = mergeProg(p, d.data().progress); lsSet(K.prog(id), p); }
      } catch (e) { console.warn("기록 읽기 실패", e); }
    }
    return p || emptyProg();
  }
  function saveProgress(id, p) {
    p.updated = Date.now();
    lsSet(K.prog(id), p);
    if (mode === "cloud") {
      pending[id] = p;
      clearTimeout(timers[id]);
      timers[id] = setTimeout(() => flush(id), 2500);
    }
  }
  async function flush(id) {
    clearTimeout(timers[id]);
    const p = pending[id];
    if (!p || mode !== "cloud") return;
    delete pending[id];
    try {
      // update()는 progress 필드를 통째로 교체(학습 취소 등 삭제가 반영됨). 문서가 없으면 set.
      await col().doc(id).update({ progress: p });
    } catch (e) {
      try { await col().doc(id).set({ progress: p }, { merge: true }); } catch (e2) { console.warn("기록 저장 실패", e2); pending[id] = p; }
    }
  }
  function flushAll() { Object.keys(pending).forEach((id) => flush(id)); }

  // 노래 전체 가사: 가족 공유(families/{code}/lyrics/{songId}). 로컬 캐시 + 세션 메모리 캐시(읽기 1회/곡).
  const LK = (sid) => "tl.lyrics." + sid;
  const lyricsCache = {};
  async function getLyrics(sid) {
    if (lyricsCache[sid] !== undefined) return lyricsCache[sid];
    let v = lsGet(LK(sid), null);
    if (mode === "cloud") {
      try { const d = await db.collection("families").doc(family).collection("lyrics").doc(sid).get();
        if (d.exists) { const c = d.data(); if (!v || (c.at || 0) >= (v.at || 0)) { v = c; lsSet(LK(sid), v); } } }
      catch (e) { console.warn("가사 읽기 실패", e); }
    }
    lyricsCache[sid] = v; return v;
  }
  async function saveLyrics(sid, text, by) {
    const v = { text: String(text || "").slice(0, 20000), by: by || "", at: Date.now() };
    lsSet(LK(sid), v); lyricsCache[sid] = v;
    if (mode === "cloud") { try { await db.collection("families").doc(family).collection("lyrics").doc(sid).set(v); } catch (e) { console.warn("가사 저장 실패", e); } }
  }

  const setCurrent = (id) => (id ? lsSet(K.cur, id) : LS.removeItem(K.cur));
  const getCurrent = () => lsGet(K.cur, null);
  function exportAll() {
    const users = lsGet(K.users, []);
    return { exportedAt: new Date().toISOString(), users, progress: Object.fromEntries(users.map((u) => [u.id, peekProgress(u.id)])) };
  }
  async function importAll(data) {
    if (!data || !Array.isArray(data.users)) throw new Error("형식이 올바르지 않습니다");
    for (const u of data.users) {
      await saveUser(u);
      const merged = mergeProg(peekProgress(u.id), (data.progress || {})[u.id]);
      saveProgress(u.id, merged);
    }
    flushAll();
  }

  return { init, get mode() { return mode; }, get family() { return family; }, emptyProg, mergeProg, getUsers, saveUser, deleteUser, getProgress, peekProgress, saveProgress, flush, flushAll, getLyrics, saveLyrics, setCurrent, getCurrent, exportAll, importAll };
})();
