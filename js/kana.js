// 가나 변환 유틸: 히라가나 ↔ 가타카나, 히라가나 → 로마자(헵번식)
window.Kana = (function () {
  const toKatakana = (s) => (s || "").replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));
  const toHiragana = (s) => (s || "").replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

  const T = {
    あ: "a", い: "i", う: "u", え: "e", お: "o",
    か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so",
    た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no",
    は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo",
    や: "ya", ゆ: "yu", よ: "yo",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro",
    わ: "wa", ゐ: "wi", ゑ: "we", を: "o", ん: "n",
    が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go",
    ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
    だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do",
    ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
    ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po",
    ゔ: "vu",
    ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゃ: "ya", ゅ: "yu", ょ: "yo",
  };
  const COMBO = {
    きゃ: "kya", きゅ: "kyu", きょ: "kyo", しゃ: "sha", しゅ: "shu", しょ: "sho",
    ちゃ: "cha", ちゅ: "chu", ちょ: "cho", にゃ: "nya", にゅ: "nyu", にょ: "nyo",
    ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo", みゃ: "mya", みゅ: "myu", みょ: "myo",
    りゃ: "rya", りゅ: "ryu", りょ: "ryo", ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo",
    じゃ: "ja", じゅ: "ju", じょ: "jo", ぢゃ: "ja", ぢゅ: "ju", ぢょ: "jo",
    びゃ: "bya", びゅ: "byu", びょ: "byo", ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo",
    ふぁ: "fa", ふぃ: "fi", ふぇ: "fe", ふぉ: "fo", うぃ: "wi", うぇ: "we", うぉ: "wo",
    てぃ: "ti", でぃ: "di", とぅ: "tu", どぅ: "du", しぇ: "she", じぇ: "je", ちぇ: "che",
    ゔぁ: "va", ゔぃ: "vi", ゔぇ: "ve", ゔぉ: "vo", いぇ: "ye", つぁ: "tsa", つぇ: "tse", つぉ: "tso",
  };
  const MACRON = { a: "ā", i: "ī", u: "ū", e: "ē", o: "ō" };

  // 띄어쓰기된 요미는 토큰별로 변환: 조사 は→wa, へ→e, 단어 끝 は(こんにちは 등)→wa
  const PARTICLE = { は: "wa", へ: "e" };
  const ENDS_WA = ["こんにちは", "こんばんは"];
  function toRomaji(input) {
    const src = toHiragana(input || "");
    const PUNCT = { "、": ", ", "。": ". ", "！": "! ", "？": "? ", "・": " " };
    return src.split(/(\s+|[、。！？・])/).map((tok) => (!tok ? "" : /^\s+$/.test(tok) ? tok : PUNCT[tok] !== undefined ? PUNCT[tok] : romajiToken(tok))).join("").replace(/ {2,}/g, " ").replace(/\s+$/, "");
  }
  function romajiToken(tok) {
    if (PARTICLE[tok]) return PARTICLE[tok];
    if (ENDS_WA.includes(tok)) return romajiCore(tok.slice(0, -1)) + "wa";
    return romajiCore(tok);
  }
  function romajiCore(s) {
    let out = "";
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      const two = s.slice(i, i + 2);
      if (c === "っ") {
        const r = COMBO[s.slice(i + 1, i + 3)] || T[s[i + 1]] || "";
        if (r) out += r.startsWith("ch") ? "t" : r[0];
        i++;
        continue;
      }
      if (c === "ー") {
        const last = out.slice(-1);
        if (MACRON[last]) out = out.slice(0, -1) + MACRON[last];
        i++;
        continue;
      }
      if (COMBO[two]) { out += COMBO[two]; i += 2; continue; }
      if (T[c]) {
        if (c === "う" && /[ou]$/.test(out)) { // おう・うう → 장음
          const last = out.slice(-1);
          out = out.slice(0, -1) + MACRON[last];
          i++;
          continue;
        }
        let r = T[c];
        if (c === "ん" && /[あいうえおやゆよ]/.test(s[i + 1] || "")) r = "n'";
        out += r;
        i++;
        continue;
      }
      out += c; // 가나가 아닌 문자(공백, 기호)는 그대로
      i++;
    }
    return out;
  }
  return { toKatakana, toHiragana, toRomaji };
})();
