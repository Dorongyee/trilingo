/* 트라이링고 메인 앱 (해시 라우팅 SPA, 빌드 도구 없음) */
(function () {
  "use strict";

  // ───────────────────────── 상수
  const LANGS = {
    en: { name: "영어", flag: "US", tts: "en-US", lang: "en" },
    zh: { name: "중국어", flag: "CN", tts: "zh-CN", lang: "zh-Hans" },
    ja: { name: "일본어", flag: "JP", tts: "ja-JP", lang: "ja" },
  };
  const LANG_ORDER = ["en", "zh", "ja"];
  const ITEMS = [...TL_WORDS, ...TL_SENTENCES];
  const BYID = {}; ITEMS.forEach((i) => (BYID[i.id] = i));
  const SIT = {}; TL_SITUATIONS.forEach((s) => (SIT[s.key] = s));
  const XP = { learnWord: 5, learnSentence: 8, testWord: 3, testSentence: 5, songLine: 2 };
  const TITLES = ["새싹", "입문자", "초보 여행자", "여행자", "탐험가", "현지인 친구", "통역사", "언어 마스터", "폴리글랏"];
  // 일본어는 가나를 못 읽는 가족을 위해 로마자(영문 발음)를 기본으로 켭니다. v: 설정 버전(마이그레이션용)
  const DEFAULT_SHOW = { py: true, hira: false, kata: false, romaji: true, ipa: true, v: 3 };
  const TYPE_NAME = { words: "단어", sentences: "문장" };
  const BY_NAME = { sit: "상황별", lv: "레벨별" };
  const NOTE_K = { grammar: "문법", vocab: "단어", idiom: "관용어구" };

  // ───────────────────────── 상태
  const S = { users: [], user: null, prog: null, test: null, study: null, preset: null, mode: "local" };
  const app = document.getElementById("app");

  // ───────────────────────── 유틸
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const go = (h) => { location.hash = h; };
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  // taste-skill-ignore (시각 표기 자릿수)
  const fmtDate = (ts) => { const d = new Date(ts); return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };
  const flags = (langs) => (langs || []).map((l) => LANGS[l].name).join(" · ");
  // 아바타: 이름 첫 글자 + 사용자별 고정 색조(이모지 대신)
  const hueOf = (id) => { let h = 0; for (const c of String(id || "")) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
  const avatarHtml = (u, cls = "") => `<span class="avatar ${cls}" style="--h:${hueOf(u.id)}">${esc((u.name || "?").trim().slice(0, 1))}</span>`;
  const ICON = {
    speaker: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l5 4V6L7 10H4z"/><path d="M15.5 9.5a3.5 3.5 0 0 1 0 5"/><path d="M18 7a7 7 0 0 1 0 10"/></svg>',
    check: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>',
    checkOn: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    home: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>',
    book: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4z"/><path d="M20 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z"/></svg>',
    test: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="m8.5 12 2 2 4-4"/></svg>',
    music: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/></svg>',
    gear: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14.2 3h-4.4l-.4 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2l.4 2.6h4.4l.4-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z"/></svg>',
  };
  const checkIcon = (on) => (on ? ICON.checkOn : ICON.check);

  function levelInfo(xp) {
    let lv = 1, need = 100, rest = xp || 0;
    while (rest >= need) { rest -= need; lv++; need = Math.round(need * 1.3); }
    return { lv, cur: rest, need, title: TITLES[Math.min(lv - 1, TITLES.length - 1)] };
  }

  let toastT;
  function toast(msg) {
    let el = document.getElementById("toast");
    if (!el) { el = document.createElement("div"); el.id = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 1800);
  }

  // ───────────────────────── 기록
  function save() { if (S.user && S.prog) Store.saveProgress(S.user.id, S.prog); }
  function addXp(n) { S.prog.xp = (S.prog.xp || 0) + n; }
  const isLearned = (id) => !!S.prog.learned[id];
  function toggleLearned(id) {
    const it = BYID[id];
    if (isLearned(id)) { delete S.prog.learned[id]; toast("학습 완료를 취소했어요"); }
    else { S.prog.learned[id] = Date.now(); addXp(it.type === "word" ? XP.learnWord : XP.learnSentence); toast(`학습 완료! +${it.type === "word" ? XP.learnWord : XP.learnSentence} XP`); }
    save();
  }
  const stat = (id) => S.prog.stats[id] || [0, 0, 0];
  function recordAnswer(id, ok) { const s = [...stat(id)]; if (ok) s[0]++; else s[1]++; s[2] = Date.now(); S.prog.stats[id] = s; }
  const isWeak = (id) => { const s = stat(id); return s[1] > 0 && s[1] >= s[0]; };
  const weakItems = () => ITEMS.filter((i) => isWeak(i.id));
  function learnedCount(list) { return list.filter((i) => isLearned(i.id)).length; }

  // ───────────────────────── 음성
  function speak(text, lang) {
    if (!("speechSynthesis" in window)) return toast("이 브라우저는 음성 재생을 지원하지 않아요");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = LANGS[lang].tts;
    const pre = LANGS[lang].tts.slice(0, 2);
    const voices = speechSynthesis.getVoices();
    const v = voices.find((x) => x.lang.replace("_", "-") === LANGS[lang].tts) || voices.find((x) => x.lang.toLowerCase().startsWith(pre));
    if (v) u.voice = v;
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
  if ("speechSynthesis" in window) speechSynthesis.getVoices();

  // ───────────────────────── 발음 표기
  function pronParts(item, lang, show) {
    show = show || (S.user && S.user.show) || DEFAULT_SHOW;
    const p = [];
    if (lang === "en" && show.ipa && item.ipa) p.push({ t: "/" + item.ipa + "/", cls: "ipa" });
    if (lang === "zh" && show.py && item.py) p.push({ t: item.py, cls: "py" });
    if (lang === "ja" && item.yomi) {
      if (show.hira) p.push({ t: item.yomi, cls: "hira", lang: "ja" });
      if (show.kata) p.push({ t: Kana.toKatakana(item.yomi), cls: "kata", lang: "ja" });
      if (show.romaji) p.push({ t: Kana.toRomaji(item.yomi), cls: "romaji" });
    }
    return p;
  }
  function pronHtml(item, lang, show) {
    const p = pronParts(item, lang, show);
    if (!p.length) return "";
    return `<div class="pron">${p.map((x) => `<span class="${x.cls}"${x.lang ? ` lang="${x.lang}"` : ""}>${esc(x.t)}</span>`).join('<span class="dot">·</span>')}</div>`;
  }
  const ttsBtn = (text, lang) => `<button class="icon-btn tts" data-act="tts" data-lang="${lang}" data-text="${esc(text)}" title="발음 듣기" aria-label="발음 듣기">${ICON.speaker}</button>`;
  const noteHtml = (item) => (item.note ? `<div class="note">${esc(item.note)}</div>` : "");
  function langRow(item, lang, opts = {}) {
    return `<div class="lang-row"><span class="lcode" title="${LANGS[lang].name}">${LANGS[lang].flag}</span><div class="lang-body"><div class="tgt" lang="${LANGS[lang].lang}">${esc(item[lang])}</div>${opts.noPron ? "" : pronHtml(item, lang)}</div>${ttsBtn(item[lang], lang)}</div>`;
  }
  function pronToggleBar() {
    const sh = S.user.show, L = S.user.langs, b = [];
    if (L.includes("zh")) b.push(["py", "병음"]);
    if (L.includes("ja")) b.push(["hira", "히라가나"], ["kata", "가타카나"], ["romaji", "로마자"]);
    if (L.includes("en")) b.push(["ipa", "발음기호"]);
    return `<div class="chips pron-toggles" aria-label="발음 표기 켜기/끄기">${b.map(([k, n]) => `<button class="chip ${sh[k] ? "on" : ""}" data-act="toggle-show" data-key="${k}">${n}</button>`).join("")}</div>`;
  }

  // ───────────────────────── 데이터 조회
  const typeList = (type) => (type === "words" ? TL_WORDS : TL_SENTENCES);
  function pool(type, by, key) {
    const src = typeList(type);
    if (!key || key === "all") return src;
    return src.filter((i) => (by === "sit" ? i.sit === key : String(i.lv) === String(key)));
  }
  function catName(by, key) {
    if (key === "all") return "전체";
    return by === "sit" ? SIT[key].name : TL_LEVELS.find((l) => String(l.key) === String(key)).name;
  }
  const categories = (by) => (by === "sit" ? TL_SITUATIONS.map((s) => ({ key: s.key, name: s.name, icon: s.icon })) : TL_LEVELS.map((l) => ({ key: String(l.key), name: l.name, icon: ["①", "②", "③"][l.key - 1], desc: l.desc })));

  // ───────────────────────── 공통 조각
  function xpBar(prog) {
    const L = levelInfo(prog.xp);
    return `<div class="xp"><div class="xp-head"><b>Lv.${L.lv} ${L.title}</b><span>${L.cur} / ${L.need} XP</span></div><div class="bar"><i style="width:${pct(L.cur, L.need)}%"></i></div></div>`;
  }
  const bar = (a, b) => `<div class="bar"><i style="width:${pct(a, b)}%"></i></div>`;
  const back = (href, label = "뒤로") => `<a class="back" href="${href}">‹ ${label}</a>`;
  const hubTiles = (base) => `
    <div class="card menu">
      <a class="menu-row" href="#/${base}/words/sit"><span><b>상황별 단어</b><small>${TL_SITUATIONS.length}개 상황 · ${TL_WORDS.length}단어</small></span><span class="chev">›</span></a>
      <a class="menu-row" href="#/${base}/sentences/sit"><span><b>상황별 문장</b><small>${TL_SITUATIONS.length}개 상황 · ${TL_SENTENCES.length}문장</small></span><span class="chev">›</span></a>
      <a class="menu-row" href="#/${base}/words/lv"><span><b>레벨별 단어</b><small>레벨 1 · 2 · 3</small></span><span class="chev">›</span></a>
      <a class="menu-row" href="#/${base}/sentences/lv"><span><b>레벨별 문장</b><small>레벨 1 · 2 · 3</small></span><span class="chev">›</span></a>
    </div>`;

  // ───────────────────────── 화면: 홈(사용자 선택)
  function viewHome() {
    const cards = S.users.map((u) => {
      const L = levelInfo(Store.peekProgress(u.id).xp);
      return `<button class="user-card" data-act="pick-user" data-id="${u.id}">${avatarHtml(u, "big")}<b>${esc(u.name)}</b><small>Lv.${L.lv} ${L.title}</small><small>${flags(u.langs)}</small></button>`;
    }).join("");
    return `
      <section class="hero"><h1>트라이링고</h1></section>
      <h2>사용자 선택</h2>
      <div class="user-grid">${cards}<a class="user-card add" href="#/new"><span class="avatar big plus">+</span><b>새 학습자</b><small>프로필 만들기</small></a></div>
      ${S.mode === "cloud" ? "" : `<p class="muted small">기록은 이 기기(브라우저)에만 저장됩니다.</p>`}`;
  }

  function viewNewUser(u) {
    const edit = !!u;
    u = u || { name: "", avatar: "", langs: ["en", "zh", "ja"] };
    return `
      ${back(edit ? "#/settings" : "#/")}
      <h1>${edit ? "프로필 수정" : "새 학습자"}</h1>
      <form id="user-form" class="card form" data-edit="${edit ? 1 : 0}">
        <label>이름<input name="name" required maxlength="12" placeholder="예: 엄마, 민수" value="${esc(u.name)}" autocomplete="off"></label>
        <div class="field"><span>배울 언어 (여러 개 선택 가능)</span><div class="check-row">${LANG_ORDER.map((l) => `<label class="check"><input type="checkbox" name="langs" value="${l}" ${u.langs.includes(l) ? "checked" : ""}> ${LANGS[l].name}</label>`).join("")}</div></div>
        <button class="btn primary big" type="submit">${edit ? "저장" : "시작하기"}</button>
      </form>`;
  }

  // ───────────────────────── 화면: 대시보드
  function viewDash() {
    const p = S.prog, u = S.user;
    const lw = learnedCount(TL_WORDS), ls = learnedCount(TL_SENTENCES), weak = weakItems().length;
    const recent = [...(p.tests || [])].slice(-3).reverse();
    const last = p.last;
    return `
      <section class="card profile">
        <div class="profile-head">${avatarHtml(u)}<div><h1>${esc(u.name)}</h1><div class="muted">${flags(u.langs)}</div></div><a class="btn ghost small" href="#/settings">설정</a></div>
        ${xpBar(p)}
      </section>
      <div class="stats">
        <div class="stat"><b>${lw}<small>/${TL_WORDS.length}</small></b><span>단어 학습</span>${bar(lw, TL_WORDS.length)}</div>
        <div class="stat"><b>${ls}<small>/${TL_SENTENCES.length}</small></b><span>문장 학습</span>${bar(ls, TL_SENTENCES.length)}</div>
        <div class="stat"><b>${weak}</b><span>취약 항목</span><a href="#/review" class="link small">복습</a></div>
        <div class="stat"><b>${(p.tests || []).length}</b><span>테스트 횟수</span><a href="#/history" class="link small">기록</a></div>
      </div>
      ${last ? `<a class="card continue" href="#/learn/${last.type}/${last.by}/${last.key}"><span>이어서 학습</span><b>${BY_NAME[last.by]} ${TYPE_NAME[last.type]} · ${catName(last.by, last.key)}</b></a>` : ""}
      <h2>학습</h2>${hubTiles("learn")}
      <h2>테스트 & 노래</h2>
      <div class="card menu">
        <a class="menu-row" href="#/test"><span><b>테스트</b><small>상황별 · 레벨별 단어와 문장</small></span><span class="chev">›</span></a>
        <a class="menu-row" href="#/songs"><span><b>노래로 배우기</b><small>${TL_SONGS.filter((s) => u.langs.includes(s.lang)).length}곡</small></span><span class="chev">›</span></a>
        <a class="menu-row" href="#/review"><span><b>취약 항목 복습</b><small>${weak}개</small></span><span class="chev">›</span></a>
      </div>
      ${recent.length ? `<h2>최근 테스트</h2><div class="card list">${recent.map(testRow).join("")}</div>` : ""}`;
  }
  const testRow = (t) => `<div class="row"><div><b>${BY_NAME[t.by] || ""} ${TYPE_NAME[t.type] || ""} · ${t.key === "all" ? "전체" : (t.by === "sit" && SIT[t.key] ? SIT[t.key].name : t.by === "lv" ? "레벨 " + t.key : t.key === "weak" ? "취약 복습" : t.key)}</b><small class="muted">${fmtDate(t.d)} · ${t.mode === "type" ? "입력형" : "선택형"} · ${(t.langs || []).map((l) => (LANGS[l] ? LANGS[l].name : l)).join("·")}</small></div><span class="score ${t.score / t.total >= 0.8 ? "good" : t.score / t.total >= 0.5 ? "mid" : "low"}">${t.score}/${t.total}</span></div>`;

  function viewHistory() {
    const tests = [...(S.prog.tests || [])].reverse();
    return `${back("#/dash")}<h1>테스트 기록</h1>${tests.length ? `<div class="card list">${tests.map(testRow).join("")}</div>` : `<p class="muted">아직 테스트 기록이 없어요.</p>`}`;
  }

  // ───────────────────────── 화면: 학습
  const viewLearnHub = () => `${back("#/dash", "홈")}<h1>학습</h1><p class="muted">한국어 뜻을 보고 선택한 언어(${S.user.langs.map((l) => LANGS[l].name).join("·")})를 함께 익힙니다. 카드를 익히면 "학습 완료"를 눌러 기록하세요. 기록된 항목으로 테스트를 봅니다.</p>${hubTiles("learn")}`;

  function viewCategories(type, by) {
    const cats = categories(by);
    return `${back("#/learn", "학습")}<h1>${BY_NAME[by]} ${TYPE_NAME[type]}</h1>
      <div class="cat-list">${cats.map((c) => { const items = pool(type, by, c.key); const n = learnedCount(items);
        return `<a class="card cat" href="#/learn/${type}/${by}/${c.key}"><span class="ico">${c.icon}</span><div class="cat-body"><b>${c.name}</b>${c.desc ? `<small class="muted">${c.desc}</small>` : ""}<small>${n} / ${items.length} 학습 완료</small>${bar(n, items.length)}</div><span class="chev">›</span></a>`; }).join("")}</div>`;
  }

  function viewStudy(type, by, key) {
    const items = pool(type, by, key);
    if (!items.length) return `${back(`#/learn/${type}/${by}`)}<p>항목이 없어요.</p>`;
    const sig = `${type}/${by}/${key}`;
    if (!S.study || S.study.sig !== sig) S.study = { sig, idx: 0, list: false };
    S.prog.last = { type, by, key }; save();
    const st = S.study, n = learnedCount(items);
    const it = items[Math.min(st.idx, items.length - 1)];
    const head = `${back(`#/learn/${type}/${by}`, `${BY_NAME[by]} ${TYPE_NAME[type]}`)}
      <div class="study-head"><h1>${catName(by, key)}</h1><span class="muted">${n}/${items.length} 완료</span></div>
      ${bar(n, items.length)}
      <div class="toolbar">${pronToggleBar()}<button class="chip alt" data-act="study-mode">${st.list ? "카드 보기" : "목록 보기"}</button></div>`;
    if (st.list) {
      return head + `<div class="card list study-list">${items.map((x, i) => `<div class="row item ${isLearned(x.id) ? "learned" : ""}"><button class="check-btn" data-act="toggle-learned" data-id="${x.id}" aria-label="학습 완료 토글">${checkIcon(isLearned(x.id))}</button><button class="row-main" data-act="study-jump" data-idx="${i}"><b>${esc(x.ko)}</b><small>${S.user.langs.map((l) => `<span lang="${LANGS[l].lang}">${esc(x[l])}</span>`).join("")}</small></button></div>`).join("")}</div>
        <div class="actions"><button class="btn primary" data-act="test-range" data-type="${type}" data-by="${by}" data-key="${key}">이 범위 테스트</button></div>`;
    }
    return head + `
      <article class="card study-card ${isLearned(it.id) ? "learned" : ""}" id="study-card">
        <div class="counter">${st.idx + 1} / ${items.length}${isWeak(it.id) ? ' <span class="tag bad">취약</span>' : ""}</div>
        <div class="ko">${esc(it.ko)}</div>
        <div class="langs">${S.user.langs.map((l) => langRow(it, l)).join("")}</div>
        ${noteHtml(it)}
        <button class="btn ${isLearned(it.id) ? "done" : "primary"} big" data-act="toggle-learned" data-id="${it.id}">${isLearned(it.id) ? "학습 완료 · 다시 누르면 취소" : "학습 완료"}</button>
      </article>
      <div class="study-nav">
        <button class="btn ghost" data-act="study-prev" ${st.idx === 0 ? "disabled" : ""}>‹ 이전</button>
        <button class="btn ghost" data-act="study-next" ${st.idx >= items.length - 1 ? "disabled" : ""}>다음 ›</button>
      </div>
      <div class="actions"><button class="btn outline" data-act="test-range" data-type="${type}" data-by="${by}" data-key="${key}">이 범위 테스트</button></div>
      <p class="hint muted small">← → 키 또는 좌우 스와이프로 넘길 수 있어요.</p>`;
  }

  // ───────────────────────── 화면: 테스트
  function viewTestHub() {
    const weak = weakItems().length;
    return `${back("#/dash", "홈")}<h1>테스트</h1><p class="muted">기본적으로 "학습 완료"한 항목에서만 출제되어, 배운 것만 체계적으로 확인할 수 있어요.</p>${hubTiles("test")}
      <div class="card menu"><button class="menu-row" data-act="test-weak" ${weak ? "" : "disabled"}><span><b>취약 항목 테스트</b><small>${weak ? `틀린 적 있는 ${weak}개` : "아직 취약 항목이 없어요"}</small></span><span class="chev">›</span></button></div>`;
  }

  function viewTestSetup(type, by) {
    const cats = categories(by);
    const preKey = S.preset && S.preset.type === type && S.preset.by === by ? S.preset.key : "all";
    const counts = (key) => { const items = pool(type, by, key); return { all: items.length, learned: learnedCount(items), weak: items.filter((i) => isWeak(i.id)).length }; };
    const c0 = counts(preKey);
    return `${back("#/test", "테스트")}<h1>${BY_NAME[by]} ${TYPE_NAME[type]} 테스트</h1>
      <form id="test-form" class="card form" data-type="${type}" data-by="${by}">
        <label>범위<select name="key" id="t-key">${[{ key: "all", name: "전체" }, ...cats].map((c) => `<option value="${c.key}" ${c.key === preKey ? "selected" : ""}>${c.name}</option>`).join("")}</select></label>
        <div class="field"><span>출제 대상</span><div class="radio-col" id="t-scope">
          <label class="check"><input type="radio" name="scope" value="learned" ${c0.learned ? "checked" : "disabled"}> 학습 완료한 것만 <small class="muted">(<span data-cnt="learned">${c0.learned}</span>개)</small></label>
          <label class="check"><input type="radio" name="scope" value="weak" ${c0.weak ? "" : "disabled"}> 취약 항목만 <small class="muted">(<span data-cnt="weak">${c0.weak}</span>개)</small></label>
          <label class="check"><input type="radio" name="scope" value="all" ${c0.learned ? "" : "checked"}> 전체 <small class="muted">(<span data-cnt="all">${c0.all}</span>개)</small></label>
        </div></div>
        <div class="field"><span>출제 언어</span><div class="check-row">${S.user.langs.map((l) => `<label class="check"><input type="checkbox" name="langs" value="${l}" checked> ${LANGS[l].name}</label>`).join("")}</div></div>
        <div class="field"><span>문제 수</span><div class="check-row">${["5", "10", "20", "all"].map((n, i) => `<label class="check pill"><input type="radio" name="count" value="${n}" ${i === 1 ? "checked" : ""}> ${n === "all" ? "전부" : n + "문제"}</label>`).join("")}</div></div>
        <div class="field"><span>방식</span><div class="check-row">
          <label class="check pill"><input type="radio" name="mode" value="mc" checked> 4지선다</label>
          <label class="check pill"><input type="radio" name="mode" value="type" > 직접 입력 (XP 2배)</label>
        </div></div>
        <button class="btn primary big" type="submit">시작</button>
      </form>`;
  }

  function buildTest(o) {
    let items = o.ids ? o.ids.map((id) => BYID[id]).filter(Boolean) : pool(o.type, o.by, o.key);
    if (o.scope === "learned") items = items.filter((i) => isLearned(i.id));
    if (o.scope === "weak") items = items.filter((i) => isWeak(i.id));
    items = shuffle(items);
    if (o.count !== "all") items = items.slice(0, +o.count);
    const qs = items.map((it) => {
      const lang = o.langs[Math.floor(Math.random() * o.langs.length)];
      const dir = o.mode === "type" ? "ko2tg" : Math.random() < 0.5 ? "ko2tg" : "tg2ko";
      const same = it.type === "word" ? TL_WORDS : TL_SENTENCES;
      const distract = shuffle(same.filter((x) => x.id !== it.id && x[lang] !== it[lang] && x.ko !== it.ko)).slice(0, 3);
      return { item: it, lang, dir, choices: shuffle([it, ...distract]), ok: null, typed: "" };
    });
    return { qs, i: 0, opts: o, xpGain: 0, done: false, recorded: false };
  }

  const norm = (s) => (s || "").toLowerCase().normalize("NFKC").replace(/[\s\p{P}\p{S}]/gu, "");
  const stripTones = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ü/g, "u").replace(/v/g, "u");
  function checkTyped(q, typed) {
    const it = q.item, t = norm(typed);
    if (!t) return false;
    if (q.lang === "en") return t === norm(it.en);
    if (q.lang === "zh") return t === norm(it.zh) || stripTones(t) === stripTones(norm(it.py));
    return t === norm(it.ja) || t === norm(it.yomi) || t === norm(Kana.toKatakana(it.yomi)) || stripTones(t) === stripTones(norm(Kana.toRomaji(it.yomi)));
  }
  function answerQ(q, ok) {
    q.ok = ok;
    recordAnswer(q.item.id, ok);
    if (ok) { let x = q.item.type === "word" ? XP.testWord : XP.testSentence; if (S.test.opts.mode === "type") x *= 2; addXp(x); S.test.xpGain += x; }
    save();
  }
  function finishTest() {
    const T = S.test;
    if (T.recorded) return;
    T.recorded = true; T.done = true;
    const score = T.qs.filter((q) => q.ok).length;
    S.prog.tests = [...(S.prog.tests || []), { d: Date.now(), type: T.opts.type, by: T.opts.by, key: T.opts.key, mode: T.opts.mode, langs: T.opts.langs, score, total: T.qs.length }].slice(-100);
    save();
  }

  function viewTestRun() {
    const T = S.test;
    if (!T || !T.qs.length) return `${back("#/test")}<p class="muted">출제할 항목이 없어요. 범위나 출제 대상을 바꿔 보세요.</p>`;
    const q = T.qs[T.i], it = q.item, L = LANGS[q.lang];
    const answered = q.ok !== null;
    const prompt = q.dir === "ko2tg"
      ? `<div class="q-label">${L.name}로는?</div><div class="q-text">${esc(it.ko)}</div>`
      : `<div class="q-label">${L.name} · 이 뜻은?</div><div class="q-text" lang="${L.lang}">${esc(it[q.lang])}</div>${pronHtml(it, q.lang)}<div class="center">${ttsBtn(it[q.lang], q.lang)}</div>`;
    let body = "";
    if (T.opts.mode === "mc") {
      body = `<div class="choices">${q.choices.map((c, i) => {
        const txt = q.dir === "ko2tg" ? c[q.lang] : c.ko;
        const cls = answered ? (c.id === it.id ? "ok" : q.chosen === c.id ? "bad" : "dim") : "";
        return `<button class="choice ${cls}" data-act="choose" data-id="${c.id}" ${answered ? "disabled" : ""}><span class="num">${i + 1}</span><span class="choice-text" ${q.dir === "ko2tg" ? `lang="${L.lang}"` : ""}>${esc(txt)}</span>${q.dir === "ko2tg" ? pronHtml(c, q.lang) : ""}</button>`; }).join("")}</div>`;
    } else {
      body = `<form id="type-form" class="type-form"><input id="type-input" lang="${L.lang}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${q.lang === "ja" ? "일본어 / 히라가나 / 로마자" : q.lang === "zh" ? "한자 또는 병음(성조 생략 가능)" : "영어로 입력"}" value="${esc(q.typed)}" ${answered ? "disabled" : ""}>${answered ? "" : `<button class="btn primary" type="submit">확인</button>`}</form>`;
    }
    const fb = answered ? `<div class="feedback ${q.ok ? "ok" : "bad"}"><b>${q.ok ? "정답" : "오답"}</b>${q.ok ? "" : `<div class="muted small">내 답: ${esc(q.typed || (q.chosen ? (q.dir === "ko2tg" ? BYID[q.chosen][q.lang] : BYID[q.chosen].ko) : ""))}</div>`}<div class="answer"><div class="ko">${esc(it.ko)}</div>${langRow(it, q.lang)}${noteHtml(it)}</div>
        <button class="btn primary big" data-act="test-next">${T.i + 1 >= T.qs.length ? "결과 보기" : "다음 →"}</button></div>` : "";
    return `
      <div class="test-top"><a class="back" href="#/test" data-act="test-quit">그만하기</a><span class="muted">${T.i + 1} / ${T.qs.length}</span></div>
      ${bar(T.i + (answered ? 1 : 0), T.qs.length)}
      <article class="card question">${prompt}${body}${fb}</article>
      ${T.opts.mode === "mc" && !answered ? `<p class="hint muted small">숫자 키 1~4로도 고를 수 있어요.</p>` : ""}`;
  }

  function viewTestResult() {
    const T = S.test;
    if (!T) return viewTestHub();
    finishTest();
    const score = T.qs.filter((q) => q.ok).length, total = T.qs.length, wrong = T.qs.filter((q) => !q.ok);
    const r = score / total;
    return `
      <section class="card result">
        <div class="big-score">${score} <small>/ ${total}</small></div>
        <div class="result-msg">${r === 1 ? "모두 맞혔어요" : r >= 0.8 ? "잘했어요" : r >= 0.5 ? "조금만 더" : "다시 복습해 볼까요"}</div>
        <div class="muted">+${T.xpGain} XP</div>${xpBar(S.prog)}
      </section>
      ${wrong.length ? `<h2>틀린 항목 (${wrong.length})</h2><div class="card list">${wrong.map((q) => `<div class="row col"><b>${esc(q.item.ko)}</b>${langRow(q.item, q.lang)}</div>`).join("")}</div>
        <div class="actions"><button class="btn primary" data-act="test-retry-wrong">틀린 것만 다시</button></div>` : ""}
      <div class="actions"><button class="btn outline" data-act="test-again">같은 설정으로 다시</button><a class="btn ghost" href="#/test">테스트 홈</a><a class="btn ghost" href="#/dash">대시보드</a></div>`;
  }

  // ───────────────────────── 화면: 복습
  function viewReview() {
    const items = weakItems();
    return `${back("#/dash", "홈")}<h1>취약 항목 복습</h1><p class="muted">테스트에서 틀린 횟수가 맞은 횟수보다 많거나 같은 항목이에요. 다시 맞히면 자연히 빠져요.</p>
      ${items.length ? `${pronToggleBar()}<div class="card list">${items.map((x) => { const s = stat(x.id); return `<div class="row col"><div class="row-head"><b>${esc(x.ko)}</b><span class="tag bad">정답 ${s[0]} · 오답 ${s[1]}</span></div>${S.user.langs.map((l) => langRow(x, l)).join("")}${noteHtml(x)}</div>`; }).join("")}</div>
      <div class="actions"><button class="btn primary big" data-act="test-weak">취약 항목 테스트</button></div>` : `<p class="card center">취약 항목이 없어요.</p>`}`;
  }

  // ───────────────────────── 화면: 노래
  function viewSongs() {
    const groups = S.user.langs.map((l) => ({ l, songs: TL_SONGS.filter((s) => s.lang === l) })).filter((g) => g.songs.length);
    return `${back("#/dash", "홈")}<h1>노래로 배우기</h1><p class="muted">유튜브 원곡을 보면서 가사 속 문법·단어·관용어구를 익혀요. 가사는 줄마다 나열되고, 색칠된 줄을 누르면 설명이 열려요. 전체 가사는 노래 화면에서 한 번 붙여 넣으면 돼요.</p>
      ${groups.map((g) => `<h2>${LANGS[g.l].name}</h2><div class="song-grid">${g.songs.map((s) => { const sp = (S.prog.songs[s.id] || {}).lines || {}; const n = Object.keys(sp).length;
        return `<a class="card song" href="#/songs/${s.id}"><img loading="lazy" src="https://i.ytimg.com/vi/${s.yt}/mqdefault.jpg" alt=""><div class="song-body"><b>${esc(s.title)}</b><small>${esc(s.artist)} · ${s.year}</small><small class="muted">레벨 ${s.lv} · ${n}/${s.lines.length + annotList(s.id).length} 구절 학습</small>${bar(n, s.lines.length + annotList(s.id).length)}</div></a>`; }).join("")}</div>`).join("")}`;
  }

  // ── 가사 줄 ↔ 해설 구절 매칭, 표현 색칠
  const normL = (s) => (s || "").toLowerCase().normalize("NFKC").replace(/[\s\p{P}\p{S}]/gu, "");
  function matchAnnot(song, lineText) { // 가사 한 줄에 해당하는 해설 구절 index, 없으면 -1
    const n = normL(lineText); if (n.length < 2) return -1;
    for (let i = 0; i < song.lines.length; i++) {
      for (const part of song.lines[i].t.split(/\s*\/\s*/)) {
        const p = normL(part); if (!p) continue;
        if (n === p || (p.length >= 6 && n.includes(p)) || (n.length >= 6 && p.includes(n))) return i;
      }
    }
    return -1;
  }
  function noteFragments(w, lang) { // "让(ràng)" → ["让"], "If ~ was ending, I'd ~" → ["If", "was ending", "I'd"]
    const s = (w || "").replace(/\([^)]*\)/g, "").replace(/[〜～]/g, "~");
    return s.split(/[~…]|\.\.\.|\s\/\s|\s\+\s|\s=\s/).map((x) => x.trim().replace(/^[,.\s]+|[,.\s]+$/g, "")).filter((x) => x && (lang === "en" ? x.length >= 2 && /[a-z]/i.test(x) : /[぀-ヿ一-鿿]/.test(x)));
  }
  function highlightText(text, notes, lang) { // notes 의 표현(w)이 나오는 부분을 색칠한 HTML
    const ranges = [];
    const hay = lang === "en" ? text.toLowerCase() : text;
    const isWord = (c) => /[a-z0-9']/i.test(c || "");
    (notes || []).forEach((n, ni) => {
      for (const f of noteFragments(n.w, lang)) {
        const needle = lang === "en" ? f.toLowerCase() : f;
        let from = 0;
        while (true) {
          const at = hay.indexOf(needle, from); if (at < 0) break; from = at + needle.length;
          if (lang === "en" && (isWord(hay[at - 1]) || isWord(hay[at + needle.length]))) continue; // 단어 경계
          ranges.push({ a: at, b: at + needle.length, k: n.k, ni });
        }
      }
    });
    ranges.sort((x, y) => x.a - y.a || (y.b - y.a) - (x.b - x.a));
    let out = "", pos = 0;
    for (const r of ranges) { if (r.a < pos) continue; out += esc(text.slice(pos, r.a)) + `<mark class="hl ${r.k}" title="${NOTE_K[r.k]}">${esc(text.slice(r.a, r.b))}</mark>`; pos = r.b; }
    return out + esc(text.slice(pos));
  }
  function lineDetail(song, i, id) {
    const line = song.lines[i], L = LANGS[song.lang], sp = S.prog.songs[id] || { lines: {} };
    const done = !!(sp.lines && sp.lines[i]);
    return `<div class="lyric-detail">
      <div class="detail-head"><div class="tgt" lang="${L.lang}">${highlightText(line.t, line.notes, song.lang)}</div>${pronHtml({ ipa: line.r, py: line.r, yomi: line.r }, song.lang)}<div class="ko">${esc(line.ko)}</div>
        <div class="detail-tools">${ttsBtn(line.t, song.lang)}<button class="btn small ${done ? "done" : "outline"}" data-act="song-line" data-song="${id}" data-idx="${i}">${done ? "학습 완료 · 취소" : "학습 완료 +" + XP.songLine + " XP"}</button></div></div>
      <ul class="notes">${line.notes.map((n) => `<li><span class="tag ${n.k}">${NOTE_K[n.k] || n.k}</span><b lang="${L.lang}">${esc(n.w)}</b><span>${esc(n.e)}</span></li>`).join("")}</ul>
    </div>`;
  }
  // 붙여 넣은 가사 줄 ↔ data/annotations.js 해설 (줄 해시로 매칭)
  const lineHash = (text) => { let h = 5381; for (const c of normL(text)) h = ((h * 33) ^ c.codePointAt(0)) >>> 0; return h.toString(36); };
  const annotList = (songId) => ((window.TL_ANNOT || {})[songId] || []);
  const annotFor = (songId, text) => annotList(songId).find((a) => a.h === lineHash(text)) || null;
  function lyricRowAnnot(song, id, key, text, an) {
    const sp = S.prog.songs[id] || { lines: {} }, L = LANGS[song.lang], open = S.songUI.open === key, lk = "h:" + an.h, done = !!(sp.lines && sp.lines[lk]);
    const detail = open ? `<div class="lyric-detail"><div class="detail-head">${an.gist ? `<div class="ko">${esc(an.gist)}</div>` : ""}<div class="detail-tools">${ttsBtn(text, song.lang)}<button class="btn small ${done ? "done" : "outline"}" data-act="song-line" data-song="${id}" data-idx="${lk}">${done ? "학습 완료 · 취소" : "학습 완료 +" + XP.songLine + " XP"}</button></div></div>
      <ul class="notes">${an.notes.map((n) => `<li><span class="tag ${n.k}">${NOTE_K[n.k] || n.k}</span><b lang="${L.lang}">${esc(n.w)}</b><span>${esc(n.e)}</span></li>`).join("")}</ul></div>` : "";
    return `<div class="lyric-line annot ${done ? "learned" : ""} ${open ? "open" : ""}"><button class="lyric-btn" data-act="lyric-open" data-key="${key}" aria-expanded="${open}"><span lang="${L.lang}">${highlightText(text, an.notes, song.lang)}</span><span class="chev">${open ? "−" : "+"}</span></button>${detail}</div>`;
  }
  function lyricRow(song, id, key, text, ai) {
    const sp = S.prog.songs[id] || { lines: {} }, L = LANGS[song.lang], open = S.songUI.open === key;
    const done = !!(sp.lines && sp.lines[ai]);
    return `<div class="lyric-line annot ${done ? "learned" : ""} ${open ? "open" : ""}"><button class="lyric-btn" data-act="lyric-open" data-key="${key}" aria-expanded="${open}"><span lang="${L.lang}">${highlightText(text, song.lines[ai].notes, song.lang)}</span><span class="chev">${open ? "−" : "+"}</span></button>${open ? lineDetail(song, ai, id) : ""}</div>`;
  }
  async function viewSong(id) {
    const s = TL_SONGS.find((x) => x.id === id);
    if (!s) return `${back("#/songs")}<p>노래를 찾을 수 없어요.</p>`;
    if (!S.songUI || S.songUI.id !== id) S.songUI = { id, open: null };
    const sp = S.prog.songs[id] || { lines: {}, lyrics: "" };
    const L = LANGS[s.lang];
    const shared = await Store.getLyrics(id);
    const text = (shared && shared.text) || "";
    const learnedN = Object.keys(sp.lines || {}).length;
    let body, matched = 0;
    if (text.trim()) {
      body = `<div class="card lyrics">${text.split(/\r?\n/).map((raw, li) => {
        const t = raw.trim(); if (!t) return `<div class="lyric-gap"></div>`;
        const ai = matchAnnot(s, t);
        if (ai >= 0) { matched++; return lyricRow(s, id, String(li), t, ai); }
        const an = annotFor(id, t);
        if (an) { matched++; return lyricRowAnnot(s, id, String(li), t, an); }
        return `<div class="lyric-line plain" lang="${L.lang}">${esc(t)}</div>`;
      }).join("")}</div>
      <p class="muted small">색칠된 줄을 누르면 설명이 열려요. 해설 있는 줄 ${matched}개</p>`;
    } else {
      body = `<div class="card lyrics">${s.lines.map((line, i) => lyricRow(s, id, "a" + i, line.t, i)).join("")}</div>
      <p class="muted small">지금은 핵심 구절만 보여요. 아래에 전체 가사를 붙여 넣으면 가사가 순서대로 표시되고, 해설이 있는 줄은 자동으로 색칠돼요.</p>`;
    }
    return `${back("#/songs", "노래")}
      <div class="song-head"><h1>${esc(s.title)}</h1><div class="muted">${esc(s.artist)} · ${s.year} · ${L.name} · 레벨 ${s.lv}</div></div>
      <div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${s.yt}" title="${esc(s.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
      <p class="small"><a class="link" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${s.yt}">YouTube에서 열기</a> <span class="muted">(재생이 안 되면 여기로)</span></p>
      <p class="card intro">${esc(s.intro)}</p>
      <div class="toolbar">${pronToggleBar()}</div>
      <div class="lyrics-head"><h2>가사 · 학습 ${learnedN}/${s.lines.length + annotList(id).length}</h2><div class="legend"><mark class="hl grammar">문법</mark><mark class="hl vocab">단어</mark><mark class="hl idiom">관용어구</mark></div></div>
      ${body}
      <details class="card lyrics-edit" ${text.trim() ? "" : "open"}>
        <summary>${text.trim() ? "가사 수정" : "전체 가사 붙여 넣기"}</summary>
        <p class="muted small">가사 사이트에서 복사해 한 줄에 한 소절씩 붙여 넣으세요. <a class="link" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(s.title + " " + s.artist + " 가사")}">가사 검색</a></p>
        <textarea id="lyrics-memo" rows="12" placeholder="가사 붙여 넣기…">${esc(text || sp.lyrics || "")}</textarea>
        <div class="actions"><button class="btn primary" data-act="song-save-lyrics" data-song="${id}">저장</button></div>
      </details>`;
  }

  // ───────────────────────── 화면: 설정
  function viewSettings() {
    const u = S.user;
    return `${back("#/dash", "홈")}<h1>설정</h1>
      <section class="card">
        <div class="profile-head">${avatarHtml(u)}<div><b>${esc(u.name)}</b><div class="muted small">${flags(u.langs)}</div></div><a class="btn ghost small" href="#/edit">수정</a></div>
      </section>
      <h2>발음 표기 기본값</h2>
      <section class="card"><p class="muted small">학습·테스트·노래 화면 상단에서도 바로 켜고 끌 수 있어요.</p>${pronToggleBar()}</section>
      <h2>저장</h2>
      <section class="card">
        <p>${S.mode === "cloud" ? `Firebase 동기화 켜짐 · 가족 코드 <code>${esc(Store.family)}</code>` : "이 기기(브라우저)에만 저장 중. 다른 기기와 공유하려면 README의 Firebase 설정을 하거나, 아래 내보내기/가져오기를 쓰세요."}</p>
        <div class="actions"><button class="btn outline" data-act="export">백업 파일 내보내기</button><label class="btn outline">백업 가져오기<input type="file" id="import-file" accept="application/json" hidden></label></div>
      </section>
      <h2>사용자</h2>
      <section class="card">
        <div class="actions"><a class="btn ghost" href="#/" data-act="switch-user">사용자 전환</a><button class="btn danger" data-act="delete-user">이 사용자 삭제</button></div>
      </section>
      <p class="muted small">트라이링고 · 단어 ${TL_WORDS.length} · 문장 ${TL_SENTENCES.length} · 노래 ${TL_SONGS.length}</p>`;
  }

  // ───────────────────────── 네비게이션
  function renderNav(route) {
    const nav = document.getElementById("nav");
    const chip = document.getElementById("user-chip");
    if (!S.user) { nav.innerHTML = ""; chip.innerHTML = ""; document.body.classList.remove("has-nav"); return; }
    document.body.classList.add("has-nav");
    const L = levelInfo(S.prog.xp);
    chip.innerHTML = `<a href="#/dash" class="chip-user">${avatarHtml(S.user, "sm")}<b>${esc(S.user.name)}</b><small>Lv.${L.lv}</small></a>`;
    const items = [["dash", ICON.home, "홈"], ["learn", ICON.book, "학습"], ["test", ICON.test, "테스트"], ["songs", ICON.music, "노래"], ["settings", ICON.gear, "설정"]];
    nav.innerHTML = items.map(([r, ic, n]) => `<a href="#/${r}" class="${route === r || (r === "dash" && (route === "review" || route === "history")) ? "active" : ""}"><span>${ic}</span><small>${n}</small></a>`).join("");
  }

  // ───────────────────────── 라우터
  const parseHash = () => location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent).filter(Boolean);
  async function pickUser(id) {
    const u = S.users.find((x) => x.id === id);
    if (!u) return;
    const oldV = (u.show && u.show.v) || 1; // 병합 전 버전 확인(병합하면 기본값의 v가 들어가 마이그레이션이 안 됨)
    u.show = Object.assign({}, DEFAULT_SHOW, u.show || {});
    if (oldV < 3) { u.show.romaji = true; u.show.hira = false; u.show.v = 3; Store.saveUser(u); } // 기존 사용자도 로마자 기본 켜기
    if (!u.langs || !u.langs.length) u.langs = ["en", "zh", "ja"];
    S.user = u;
    S.prog = await Store.getProgress(id);
    Store.setCurrent(id);
  }
  let rendering = false;
  async function render() {
    if (rendering) return; rendering = true;
    try {
      const [a, b, c, d] = parseHash();
      if (!a || a === "new") {
        S.users = await Store.getUsers();
        if (a === "new") { S.user = null; S.prog = null; }
        if (!a) { S.user = null; S.prog = null; Store.setCurrent(null); }
      } else if (!S.user) {
        const cur = Store.getCurrent();
        S.users = await Store.getUsers();
        if (cur && S.users.some((u) => u.id === cur)) await pickUser(cur);
        else { location.replace("#/"); rendering = false; return render(); }
      }
      let html = "";
      switch (a) {
        case undefined: html = viewHome(); break;
        case "new": html = viewNewUser(); break;
        case "edit": html = viewNewUser(S.user); break;
        case "dash": html = viewDash(); break;
        case "learn": html = !b ? viewLearnHub() : !d ? viewCategories(b, c) : viewStudy(b, c, d); break;
        case "test": html = b === "run" ? viewTestRun() : b === "result" ? viewTestResult() : !b ? viewTestHub() : viewTestSetup(b, c); break;
        case "songs": html = b ? await viewSong(b) : viewSongs(); break;
        case "review": html = viewReview(); break;
        case "history": html = viewHistory(); break;
        case "settings": html = viewSettings(); break;
        default: html = viewHome();
      }
      app.innerHTML = html;
      renderNav(a);
      afterRender(a, b);
    } finally { rendering = false; }
  }
  let lastRoute = "";
  function afterRender(a, b) {
    const key = a + "/" + (b || "");
    if (key !== lastRoute) window.scrollTo(0, 0);
    lastRoute = key;
    const inp = document.getElementById("type-input");
    if (inp && !inp.disabled) inp.focus();
    const card = document.getElementById("study-card");
    if (card) {
      let x0 = null;
      card.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
      card.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 60) studyMove(dx < 0 ? 1 : -1); }, { passive: true });
    }
  }
  function studyMove(d) {
    const [, type, by, key] = parseHash();
    const n = pool(type, by, key).length;
    const ni = S.study.idx + d;
    if (ni < 0 || ni >= n) return;
    S.study.idx = ni; render();
  }
  function startTest(o) {
    S.test = buildTest(o);
    if (!S.test.qs.length) return toast("출제할 항목이 없어요. 범위/대상을 바꿔 보세요.");
    go("/test/run");
  }

  // ───────────────────────── 이벤트
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    switch (act) {
      case "pick-user": await pickUser(el.dataset.id); go("/dash"); break;
      case "tts": speak(el.dataset.text, el.dataset.lang); break;
      case "toggle-show": S.user.show[el.dataset.key] = !S.user.show[el.dataset.key]; await Store.saveUser(S.user); render(); break;
      case "toggle-learned": toggleLearned(el.dataset.id); render(); break;
      case "study-prev": studyMove(-1); break;
      case "study-next": studyMove(1); break;
      case "study-mode": S.study.list = !S.study.list; render(); break;
      case "study-jump": S.study.idx = +el.dataset.idx; S.study.list = false; render(); break;
      case "test-range": S.preset = { type: el.dataset.type, by: el.dataset.by, key: el.dataset.key }; go(`/test/${el.dataset.type}/${el.dataset.by}`); break;
      case "test-weak": { const ids = weakItems().map((i) => i.id); startTest({ ids, type: "mixed", by: "mixed", key: "weak", scope: "all", langs: S.user.langs, count: "all", mode: "mc" }); break; }
      case "choose": { const q = S.test.qs[S.test.i]; if (q.ok !== null) return; q.chosen = el.dataset.id; answerQ(q, el.dataset.id === q.item.id); render(); break; }
      case "test-next": if (S.test.i + 1 >= S.test.qs.length) { finishTest(); go("/test/result"); } else { S.test.i++; render(); } break;
      case "test-quit": e.preventDefault(); if (S.test && !S.test.done && S.test.qs.some((q) => q.ok !== null)) finishTestPartial(); S.test = null; go("/test"); break;
      case "test-retry-wrong": { const ids = S.test.qs.filter((q) => !q.ok).map((q) => q.item.id); startTest({ ...S.test.opts, ids, scope: "all", count: "all", key: S.test.opts.key }); break; }
      case "test-again": startTest({ ...S.test.opts }); break;
      case "song-line": { const id = el.dataset.song, i = el.dataset.idx; const sp = (S.prog.songs[id] = S.prog.songs[id] || { lines: {}, lyrics: "", lyricsAt: 0 }); if (sp.lines[i]) delete sp.lines[i]; else { sp.lines[i] = Date.now(); addXp(XP.songLine); toast(`+${XP.songLine} XP`); } save(); render(); break; }
      case "song-save-lyrics": { const id = el.dataset.song; const text = document.getElementById("lyrics-memo").value; await Store.saveLyrics(id, text, S.user.name); if (S.songUI) S.songUI.open = null; toast(text.trim() ? "가사를 저장했어요" : "가사를 비웠어요"); render(); break; }
      case "lyric-open": { const k = el.dataset.key; S.songUI.open = S.songUI.open === k ? null : k; render(); break; }
      case "export": { const data = Store.exportAll(); const blob = new Blob([JSON.stringify(data, null, 1)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `trilingo-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); URL.revokeObjectURL(a.href); break; }
      case "switch-user": S.user = null; S.prog = null; break;
      case "delete-user": if (confirm(`"${S.user.name}" 사용자와 모든 학습 기록을 삭제할까요? 되돌릴 수 없어요.`)) { await Store.deleteUser(S.user.id); S.user = null; S.prog = null; toast("삭제했어요"); go("/"); } break;
    }
  });
  function finishTestPartial() {
    const T = S.test; const done = T.qs.filter((q) => q.ok !== null); if (!done.length) return;
    S.prog.tests = [...(S.prog.tests || []), { d: Date.now(), type: T.opts.type, by: T.opts.by, key: T.opts.key, mode: T.opts.mode, langs: T.opts.langs, score: done.filter((q) => q.ok).length, total: done.length }].slice(-100); save();
  }

  document.addEventListener("submit", async (e) => {
    const f = e.target;
    if (f.id === "user-form") {
      e.preventDefault();
      const fd = new FormData(f);
      const name = (fd.get("name") || "").trim(); if (!name) return;
      const langs = fd.getAll("langs"); if (!langs.length) return toast("언어를 하나 이상 선택하세요");
      if (f.dataset.edit === "1") { Object.assign(S.user, { name, langs }); await Store.saveUser(S.user); toast("저장했어요"); go("/settings"); }
      else {
        // 같은 이름이 가족 목록에 이미 있으면(다른 기기에서 만든 프로필) 새로 만들지 않고 그 기록에 연결
        const existing = S.users.find((x) => (x.name || "").trim().toLowerCase() === name.toLowerCase());
        if (existing) { toast(`"${existing.name}" 기존 기록을 이어서 사용해요`); await pickUser(existing.id); go("/dash"); return; }
        const u = { id: uid(), name, avatar: "", langs, show: { ...DEFAULT_SHOW }, created: Date.now() }; await Store.saveUser(u); S.users = await Store.getUsers(); if (!S.users.some((x) => x.id === u.id)) S.users.push(u); await pickUser(u.id); go("/dash"); }
    }
    if (f.id === "test-form") {
      e.preventDefault();
      const fd = new FormData(f);
      const langs = fd.getAll("langs"); if (!langs.length) return toast("출제 언어를 선택하세요");
      startTest({ type: f.dataset.type, by: f.dataset.by, key: fd.get("key"), scope: fd.get("scope") || "all", langs, count: fd.get("count"), mode: fd.get("mode") });
    }
    if (f.id === "type-form") {
      e.preventDefault();
      const q = S.test.qs[S.test.i]; if (q.ok !== null) return;
      q.typed = document.getElementById("type-input").value;
      if (!q.typed.trim()) return;
      answerQ(q, checkTyped(q, q.typed)); render();
    }
  });

  document.addEventListener("change", async (e) => {
    const t = e.target;
    if (t.id === "t-key") { // 범위 바꾸면 출제 대상 개수 갱신
      const f = t.closest("form"); const items = pool(f.dataset.type, f.dataset.by, t.value);
      const cnt = { all: items.length, learned: learnedCount(items), weak: items.filter((i) => isWeak(i.id)).length };
      f.querySelectorAll("[data-cnt]").forEach((el) => (el.textContent = cnt[el.dataset.cnt]));
      f.querySelectorAll('input[name="scope"]').forEach((r) => { r.disabled = cnt[r.value] === 0; if (r.disabled && r.checked) f.querySelector('input[name="scope"][value="all"]').checked = true; });
    }
    if (t.id === "import-file" && t.files[0]) {
      try { const data = JSON.parse(await t.files[0].text()); await Store.importAll(data); S.users = await Store.getUsers(); if (S.user) S.prog = await Store.getProgress(S.user.id); toast("가져왔어요"); render(); }
      catch (err) { toast("가져오기 실패: " + err.message); }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select")) return;
    const [a, b] = parseHash();
    if (a === "learn" && S.study && !S.study.list) { if (e.key === "ArrowLeft") studyMove(-1); if (e.key === "ArrowRight") studyMove(1); }
    if (a === "test" && b === "run" && S.test) {
      const q = S.test.qs[S.test.i];
      if (q.ok === null && S.test.opts.mode === "mc" && /^[1-4]$/.test(e.key)) { const c = q.choices[+e.key - 1]; if (c) { q.chosen = c.id; answerQ(q, c.id === q.item.id); render(); } }
      else if (q.ok !== null && e.key === "Enter") { document.querySelector('[data-act="test-next"]')?.click(); }
    }
  });

  window.addEventListener("hashchange", render);

  // ───────────────────────── 시작
  (async function boot() {
    S.mode = await Store.init();
    const q = new URLSearchParams(location.search); if (q.get("u")) Store.setCurrent(q.get("u")); // ?u=사용자id 로 바로 접속(개인 즐겨찾기용)
    if (!location.hash) location.replace("#/");
    await render();
  })();
})();
