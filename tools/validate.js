// 데이터 검증: node tools/validate.js
// 단어·문장·노래 데이터의 형식 오류를 찾습니다(id 중복, 필드 누락, 요미 비히라가나, 병음 이상, 같은 상황 내 뜻 중복, 유튜브 ID 중복).
const path = require("path");
global.window = global;
const root = path.join(__dirname, "..");
require(path.join(root, "data/words.js"));
require(path.join(root, "data/sentences.js"));
require(path.join(root, "data/songs.js"));
require(path.join(root, "js/kana.js"));

const errors = [], warns = [];
const items = [...TL_WORDS, ...TL_SENTENCES];
const sits = new Set(TL_SITUATIONS.map((s) => s.key));
const ids = new Map();
const yomiRe = /^[ぁ-ゖー\s、。！？!?.,'’…～〜・\-]+$/;
const pyRe = /^[a-zA-ZāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙńňǹ'’\s,.?!:;\-]+$/;
const ipaRe = /^[a-zA-Zɑæɐɒʌəɚɝɛɜɪɨʊʉɔɒøœɶɯɤθðʃʒʧʤŋɡɹɾɫʔːˈˌ.'’\s,?!\-()]+$/;
const perSit = {};
for (const it of items) {
  const where = `${it.id} (${it.ko})`;
  if (ids.has(it.id)) errors.push(`중복 id: ${it.id}`); ids.set(it.id, it);
  for (const k of ["ko", "en", "ipa", "zh", "py", "ja", "yomi"]) if (!it[k] || !String(it[k]).trim()) errors.push(`${where}: ${k} 비어 있음`);
  if (!sits.has(it.sit)) errors.push(`${where}: 알 수 없는 상황키 ${it.sit}`);
  if (![1, 2, 3].includes(it.lv)) errors.push(`${where}: 레벨 ${it.lv}`);
  if (it.yomi && !yomiRe.test(it.yomi)) errors.push(`${where}: 요미에 히라가나 외 문자 → ${it.yomi}`);
  if (it.py && !pyRe.test(it.py)) errors.push(`${where}: 병음 이상 → ${it.py}`);
  if (it.ipa && !ipaRe.test(it.ipa)) warns.push(`${where}: IPA 확인 → ${it.ipa}`);
  if (it.ipa && /[\/]/.test(it.ipa)) errors.push(`${where}: IPA 에 슬래시`);
  if (/[一-鿿]/.test(it.zh) === false && it.zh) warns.push(`${where}: 중국어에 한자 없음 → ${it.zh}`);
  const key = it.type + ":" + it.sit;
  perSit[key] = perSit[key] || { ko: new Set(), en: new Set() };
  const ko = it.ko.replace(/\(.*?\)/g, "").trim().toLowerCase(), en = it.en.trim().toLowerCase();
  if (perSit[key].ko.has(ko)) warns.push(`${where}: 같은 상황에 한국어 중복`);
  if (perSit[key].en.has(en)) warns.push(`${where}: 같은 상황에 영어 중복 (${it.en})`);
  perSit[key].ko.add(ko); perSit[key].en.add(en);
  if (it.type === "word" && it.ja && it.yomi && /^[ぁ-ゖー]+$/.test(it.ja) && it.ja !== it.yomi) warns.push(`${where}: 일본어가 히라가나인데 요미와 다름 ${it.ja} / ${it.yomi}`);
}
const songIds = new Set(), yts = new Set();
for (const s of TL_SONGS) {
  if (songIds.has(s.id)) errors.push(`노래 id 중복 ${s.id}`); songIds.add(s.id);
  if (yts.has(s.yt)) errors.push(`노래 yt 중복 ${s.yt} (${s.title})`); yts.add(s.yt);
  if (!["en", "zh", "ja"].includes(s.lang)) errors.push(`${s.id}: lang`);
  if (!s.yt || !/^[\w-]{11}$/.test(s.yt)) errors.push(`${s.id}: yt ID 형식 (${s.yt})`);
  if (!s.lines || s.lines.length < 3) errors.push(`${s.id}: 구절 부족`);
  (s.lines || []).forEach((l, i) => {
    for (const k of ["t", "r", "ko"]) if (!l[k]) errors.push(`${s.id} #${i}: ${k} 없음`);
    if (s.lang === "ja" && l.r && !yomiRe.test(l.r.replace(/\//g, ""))) errors.push(`${s.id} #${i}: r 에 히라가나 외 문자 → ${l.r}`);
    if (s.lang === "zh" && l.r && !pyRe.test(l.r.replace(/\//g, ""))) errors.push(`${s.id} #${i}: 병음 이상 → ${l.r}`);
    (l.notes || []).forEach((n) => { if (!["grammar", "vocab", "idiom"].includes(n.k)) errors.push(`${s.id} #${i}: note k=${n.k}`); if (!n.w || !n.e) errors.push(`${s.id} #${i}: note 비어 있음`); });
  });
}
const lv = (list) => [1, 2, 3].map((l) => list.filter((i) => i.lv === l).length).join("/");
console.log(`단어 ${TL_WORDS.length} (레벨 ${lv(TL_WORDS)}), 문장 ${TL_SENTENCES.length} (레벨 ${lv(TL_SENTENCES)}), 노래 ${TL_SONGS.length} (en ${TL_SONGS.filter((s) => s.lang === "en").length} / zh ${TL_SONGS.filter((s) => s.lang === "zh").length} / ja ${TL_SONGS.filter((s) => s.lang === "ja").length}), 상황 ${TL_SITUATIONS.length}`);
for (const s of TL_SITUATIONS) console.log(`  ${s.key.padEnd(8)} 단어 ${String(TL_WORDS.filter((w) => w.sit === s.key).length).padStart(3)}  문장 ${String(TL_SENTENCES.filter((w) => w.sit === s.key).length).padStart(3)}`);
if (warns.length) { console.log(`\n경고 ${warns.length}건:`); warns.forEach((w) => console.log("  - " + w)); }
if (errors.length) { console.log(`\n오류 ${errors.length}건:`); errors.forEach((e) => console.log("  - " + e)); process.exit(1); }
console.log("\n오류 없음 ✓");
