// 붙여 넣은 가사의 줄별 해설. 가사 원문은 넣지 않고 줄 식별값(h: 정규화한 줄의 해시) + 짧은 표현(w) + 설명(e)만 저장합니다.
// 형식: { h: "해시", gist: "짧은 뜻 요약(선택)", notes: [{ k: "grammar"|"vocab"|"idiom", w: "표현", e: "설명" }] }
// 해시는 사이트의 노래 화면에서 가사를 붙여 넣은 뒤 자동으로 맞춰집니다. (해시 계산: js/app.js lineHash)
window.TL_ANNOT = {
  // ───────────── Die With A Smile (Lady Gaga, Bruno Mars)
  "en-die-with-a-smile": [
    { h: "cwgjex", gist: "그게 다 무슨 뜻인지 모르겠어", notes: [
      { k: "grammar", w: "what it all means", e: "간접의문문. 의문문 What does it mean? 이 문장 속에 들어가면 what it means 처럼 '의문사 + 주어 + 동사' 어순이 됩니다. I don't know what she wants." },
      { k: "vocab", w: "mean", e: "'의미하다'. What do you mean?(무슨 말이야?), It means a lot.(큰 의미가 있어)." },
    ] },
    { h: "tck334", gist: "하지만 살아남고 나서 깨달았어", notes: [
      { k: "grammar", w: "since", e: "여기서는 '~했으니까(이유)'. 시간의 '~이후로'와 구분하세요. Since you're here, let's start.(네가 왔으니 시작하자)" },
      { k: "vocab", w: "survived", e: "survive 살아남다, 견디다. 과거형 survived. I survived the exam.(시험을 버텨냈어)" },
      { k: "vocab", w: "realized", e: "realize 깨닫다(미국식 -ize, 영국식 realise). I realized I was wrong." },
    ] },
    { h: "wockz1", gist: "네가 어디로 가든, 거기가 내가 따라갈 곳이야", notes: [
      { k: "grammar", w: "Wherever you go", e: "wherever = '어디로 ~하든'. where + ever 로 '~하는 곳이면 어디든'. Wherever you are, I'll find you." },
      { k: "idiom", w: "that's where I'll follow", e: "'거기가 바로 내가 따라갈 곳' = 어디든 따라가겠다는 뜻. That's where ~ 는 '바로 거기가 ~한 곳'을 강조하는 틀." },
      { k: "vocab", w: "follow", e: "따라가다, (SNS) 팔로우하다. Follow me.(따라와)" },
    ] },
    { h: "y4o34t", gist: "내일은 누구에게도 약속된 게 아니야", notes: [
      { k: "grammar", w: "Nobody's promised", e: "Nobody is promised ~ 의 수동태. '아무도 ~을 약속받지 못했다'. 's 는 is 의 축약." },
      { k: "idiom", w: "Nobody's promised tomorrow", e: "영어 격언 Tomorrow is not promised.(내일은 보장되지 않는다) 를 변형한 표현. 오늘을 소중히 하라는 뜻." },
    ] },
    { h: "9vgtqc", gist: "그러니 매일 밤 마지막 밤인 것처럼 널 사랑할 거야", notes: [
      { k: "vocab", w: "I'ma", e: "I'm gonna(= I'm going to) 의 더 줄어든 구어·노래 표현. 글에서는 쓰지 않습니다." },
      { k: "grammar", w: "like it's the last night", e: "like = as if, '마치 ~인 것처럼'. 구어에서 매우 흔함. He acts like he's the boss." },
      { k: "grammar", w: "every night", e: "every 뒤에는 단수 명사. every day, every night, every person." },
    ] },
    { h: "be017i", gist: "우리가 소리치는 말들 속에서 길을 잃고", notes: [
      { k: "idiom", w: "lost in", e: "'~에 빠져, ~에 휩싸여'. lost in thought(생각에 잠긴), lost in music(음악에 빠진)." },
      { k: "grammar", w: "the words that we scream", e: "관계대명사 that(목적격)이 the words 를 수식. 목적격이라 생략 가능: the words we scream." },
      { k: "vocab", w: "scream", e: "소리치다, 비명을 지르다. 여기선 '서로에게 퍼붓는 말'의 느낌." },
    ] },
    { h: "4cu1j0", gist: "이제 이런 거(다투는 것) 더는 하고 싶지도 않아", notes: [
      { k: "grammar", w: "anymore", e: "부정문 끝에서 '더 이상 (~않다)'. I don't live there anymore." },
      { k: "vocab", w: "even", e: "부정문에서 '~조차'. I don't even know him.(그를 알지도 못해)" },
      { k: "vocab", w: "wanna", e: "want to 의 구어 축약." },
    ] },
    { h: "zgnjy9", gist: "넌 이미 네가 나한테 어떤 의미인지 알잖아", notes: [
      { k: "vocab", w: "'Cause", e: "because 의 축약. 노래·구어에서 cuz, cos 로도 씀." },
      { k: "idiom", w: "what you mean to me", e: "'네가 나에게 어떤 의미인지' = 네가 얼마나 소중한지. You mean a lot to me.(넌 내게 소중해)" },
      { k: "grammar", w: "already", e: "'이미'. 보통 조동사·be동사 뒤, 일반동사 앞: You already know." },
    ] },
    { h: "v96np", gist: "우리 사랑만이 싸워서 지킬 가치가 있는 전쟁이야", notes: [
      { k: "grammar", w: "worth fighting for", e: "worth + 동명사 = '~할 가치가 있는'. It's worth trying.(해 볼 만해), a city worth visiting." },
      { k: "grammar", w: "love's", e: "love is 의 축약. 's 는 is/has/소유격 셋 중 문맥으로 판단." },
      { k: "vocab", w: "the only", e: "'유일한'. the only one(유일한 사람/것)." },
    ] },
    { h: "1x9j462", gist: "바로 네 곁에", notes: [
      { k: "vocab", w: "Right", e: "부사 right 는 '바로'라는 강조. right here(바로 여기), right now(지금 당장)." },
      { k: "idiom", w: "next to you", e: "'네 바로 옆에'. next to = beside." },
    ] },
    { h: "1rpca07", gist: "난 네 곁에 있고 싶을 거야", notes: [
      { k: "grammar", w: "I'd wanna", e: "I would want to. 가정법 결과절(If the world was ending 이 생략된 채 이어짐). '~라면 ~하고 싶을 거야'." },
    ] },
  ],
};
