// 노래 데이터.
// 저작권 때문에 전체 가사는 넣지 않고, 학습 포인트가 되는 핵심 구절만 짧게 발췌해 해설합니다.
// 전체 가사는 각 노래 화면의 "내 가사 메모" 칸에 직접 붙여 넣으면 본인 학습 기록에만 저장됩니다.
// 새 노래 추가: 아래 형식을 복사해서 id(고유), lang(en/zh/ja), title, artist, yt(유튜브 영상 ID), lines를 채우면 됩니다.
//   line = { t: 원문, r: 발음(영어 IPA / 중국어 병음 / 일본어 히라가나), ko: 한국어 뜻, notes: [{ k: "grammar"|"vocab"|"idiom", w: 표현, e: 설명 }] }
window.TL_SONGS = [
  // ───────────────────────── 영어
  {
    id: "en-die-with-a-smile", lang: "en", lv: 2,
    title: "Die With A Smile", artist: "Lady Gaga, Bruno Mars", year: 2024,
    yt: "kPa7bsKwL-c",
    intro: "2024~2025년 전 세계 스트리밍 차트를 장기간 석권한 듀엣 발라드. 가정법(If ~ was, I'd ~)과 구어 축약(wanna)이 반복돼 영어 조건문을 익히기 좋습니다.",
    lines: [
      { t: "I just woke up from a dream / Where you and I had to say goodbye", r: "aɪ dʒʌst woʊk ʌp frəm ə driːm / wer juː ənd aɪ hæd tə seɪ ˌɡʊdˈbaɪ", ko: "꿈에서 막 깨어났어 / 너와 내가 작별해야 했던 꿈",
        notes: [
          { k: "vocab", w: "wake up from a dream", e: "꿈에서 깨다. wake의 과거형은 woke(불규칙: wake-woke-woken)." },
          { k: "grammar", w: "a dream where ~", e: "관계부사 where가 장소뿐 아니라 '꿈, 상황'처럼 추상적인 배경에도 쓰입니다. = a dream in which ~" },
          { k: "grammar", w: "had to", e: "have to(~해야 한다)의 과거. '~해야 했다'." },
        ] },
      { t: "If the world was ending, I'd wanna be next to you", r: "ɪf ðə wɜːrld wəz ˈendɪŋ, aɪd ˈwɑːnə biː nekst tə juː", ko: "세상이 끝나가고 있다면, 난 네 곁에 있고 싶어",
        notes: [
          { k: "grammar", w: "If ~ was ending, I'd ~", e: "가정법 과거(2형식 조건문). 현실과 다른 상황을 상상. 격식체는 If the world were ending이지만 노래·구어에서는 was를 흔히 씁니다. I'd = I would." },
          { k: "vocab", w: "wanna", e: "want to의 구어 축약. 노래·대화에서만 쓰고 글에서는 쓰지 않습니다. (gonna = going to, gotta = got to)" },
          { k: "idiom", w: "next to you", e: "'네 바로 옆에'. next to = beside. 물리적 거리와 정서적 가까움을 함께 표현." },
        ] },
      { t: "If the party was over and our time on Earth was through", r: "ɪf ðə ˈpɑːrti wəz ˈoʊvər ənd ˈaʊər taɪm ɑːn ɜːrθ wəz θruː", ko: "파티가 끝나고 지상에서의 우리 시간이 다 끝났다면",
        notes: [
          { k: "idiom", w: "be over", e: "끝나다. The game is over. / It's over between us.(우리 사이는 끝났어)" },
          { k: "idiom", w: "be through", e: "구어로 '끝나다, 다 마치다'. Are you through with that?(그거 다 썼어?) 여기선 '삶이 끝나다'." },
          { k: "vocab", w: "our time on Earth", e: "'지상에서의 시간' = 살아 있는 동안. Earth는 행성 이름이라 대문자." },
        ] },
      { t: "I'd wanna hold you just for a while and die with a smile", r: "aɪd ˈwɑːnə hoʊld juː dʒʌst fər ə waɪl ənd daɪ wɪð ə smaɪl", ko: "잠시라도 널 안고, 웃으며 죽고 싶어",
        notes: [
          { k: "idiom", w: "for a while", e: "잠시 동안. just for a while = 아주 잠깐이라도." },
          { k: "grammar", w: "die with a smile", e: "with + 명사 = '~을 지닌 채, ~하면서'. with a smile(웃으며), with tears(눈물 흘리며), with ease(쉽게)." },
          { k: "vocab", w: "hold", e: "안다, 붙잡다. hold hands(손잡다), hold on(기다려/버텨)." },
        ] },
    ] },
  {
    id: "en-birds-of-a-feather", lang: "en", lv: 2,
    title: "BIRDS OF A FEATHER", artist: "Billie Eilish", year: 2024,
    yt: "V9PVRfjEBTI",
    intro: "2024년 스포티파이 글로벌 최다 스트리밍 곡 중 하나. 제목부터 영어 속담에서 온 관용어이고, 'til·stick together 같은 구어 표현이 많습니다.",
    lines: [
      { t: "I want you to stay / 'Til I'm in the grave", r: "aɪ wɑːnt juː tə steɪ / tɪl aɪm ɪn ðə ɡreɪv", ko: "네가 머물길 바라 / 내가 무덤에 들어갈 때까지",
        notes: [
          { k: "grammar", w: "want + 사람 + to V", e: "'누가 ~하기를 원하다'. I want you to stay = 네가 머물면 좋겠어. (I want to stay는 '내가' 머물고 싶다)" },
          { k: "vocab", w: "'til", e: "until의 축약. 노래·구어에서 자주 쓰며 till로도 씁니다." },
          { k: "idiom", w: "in the grave", e: "무덤 속에 = 죽어서. 죽을 때까지 함께 있자는 뜻." },
        ] },
      { t: "'Til I rot away, dead and buried", r: "tɪl aɪ rɑːt əˈweɪ, ded ənd ˈberid", ko: "내가 썩어 사라져 죽어 묻힐 때까지",
        notes: [
          { k: "vocab", w: "rot away", e: "썩어 없어지다. away는 '완전히 사라질 때까지'의 뉘앙스(fade away, melt away)." },
          { k: "idiom", w: "dead and buried", e: "직역은 '죽어 묻힌'. 관용적으로 '완전히 끝난(과거의 일)'에도 씁니다. That issue is dead and buried." },
        ] },
      { t: "Birds of a feather, we should stick together, I know", r: "bɜːrdz əv ə ˈfeðər, wiː ʃʊd stɪk təˈɡeðər, aɪ noʊ", ko: "같은 깃털의 새들, 우린 함께 뭉쳐야 해, 알아",
        notes: [
          { k: "idiom", w: "birds of a feather (flock together)", e: "속담 '같은 깃털의 새는 함께 모인다' = 유유상종. 노래에선 '우린 닮은 사람'이라는 뜻으로 앞부분만 썼습니다." },
          { k: "idiom", w: "stick together", e: "서로 붙어 있다 → 의리를 지키며 함께하다. Families stick together." },
          { k: "grammar", w: "should", e: "'~해야 한다(당위·조언)'. must보다 부드러운 권고." },
        ] },
      { t: "I'll love you 'til the day that I die", r: "aɪl lʌv juː tɪl ðə deɪ ðət aɪ daɪ", ko: "죽는 날까지 널 사랑할 거야",
        notes: [
          { k: "grammar", w: "the day that I die", e: "that은 관계대명사(목적격)로 생략 가능: the day I die. 'the day (when) I die'와 같은 뜻." },
          { k: "grammar", w: "I'll", e: "I will. 미래의 의지·약속." },
        ] },
      { t: "I don't know what I'm crying for / I don't think I could love you more", r: "aɪ doʊnt noʊ wʌt aɪm ˈkraɪɪŋ fɔːr / aɪ doʊnt θɪŋk aɪ kʊd lʌv juː mɔːr", ko: "내가 왜 울고 있는지 모르겠어 / 널 더 사랑할 수는 없을 것 같아",
        notes: [
          { k: "grammar", w: "what ~ for", e: "= why. What are you crying for?(왜 울어?) 간접의문문이 되면 what I'm crying for 어순." },
          { k: "idiom", w: "couldn't love you more", e: "'더 사랑할 수 없다' = 최고로 사랑한다. 비교급 부정으로 최상의 의미를 내는 영어식 표현. I couldn't agree more(전적으로 동의)." },
          { k: "grammar", w: "I don't think + 절", e: "영어는 부정을 앞 동사(think)에 두는 경향: I don't think I can ≫ I think I can't." },
        ] },
    ] },
  {
    id: "en-apt", lang: "en", lv: 1,
    title: "APT.", artist: "ROSÉ & Bruno Mars", year: 2024,
    yt: "ekr2nIex040",
    intro: "한국 술게임 '아파트'를 소재로 한 글로벌 히트곡. 짧은 명령문·부정의문문이 반복돼 입문자에게 좋습니다.",
    lines: [
      { t: "Kissy face, kissy face / Sent to your phone", r: "ˈkɪsi feɪs, ˈkɪsi feɪs / sent tə jʊr foʊn", ko: "뽀뽀하는 얼굴(이모지), 뽀뽀하는 얼굴 / 네 폰으로 보냈어",
        notes: [
          { k: "vocab", w: "kissy face", e: "입을 쭉 내민 뽀뽀 표정(😘 이모지). 명사에 -y를 붙여 귀여운 형용사를 만드는 구어 패턴(kissy, smiley, touchy)." },
          { k: "grammar", w: "sent to your phone", e: "과거분사 sent가 앞 명사를 수식: '네 폰으로 보내진'. (which was) sent to your phone." },
        ] },
      { t: "But I'm trying to kiss your lips for real", r: "bət aɪm ˈtraɪɪŋ tə kɪs jʊr lɪps fər rɪəl", ko: "하지만 난 진짜로 네 입술에 키스하고 싶어",
        notes: [
          { k: "grammar", w: "be trying to V", e: "'~하려고 하는 중이다'. 현재진행형으로 지금의 의도를 나타냅니다." },
          { k: "idiom", w: "for real", e: "구어 '진짜로, 농담 아니고'. Are you for real?(진심이야?)" },
        ] },
      { t: "Don't you want me like I want you, baby? / Don't you need me like I need you now?", r: "doʊnt juː wɑːnt miː laɪk aɪ wɑːnt juː, ˈbeɪbi / doʊnt juː niːd miː laɪk aɪ niːd juː naʊ", ko: "내가 너를 원하듯 너도 나를 원하지 않아? / 내가 널 필요로 하듯 너도 지금 내가 필요하지 않아?",
        notes: [
          { k: "grammar", w: "Don't you ~?", e: "부정의문문. '~하지 않아?' 상대의 동의를 확인·유도하는 느낌. 대답은 사실 기준으로 Yes(원해)/No(안 원해)." },
          { k: "grammar", w: "like I want you", e: "여기서 like는 접속사 '~처럼(= as)'. 구어에서 매우 흔함. 격식 글에서는 as를 권장." },
          { k: "vocab", w: "baby", e: "연인을 부르는 호칭. babe, honey, darling도 같은 용도." },
        ] },
      { t: "Sleep tomorrow, but tonight go crazy", r: "sliːp təˈmɑːroʊ, bət təˈnaɪt ɡoʊ ˈkreɪzi", ko: "잠은 내일 자고, 오늘 밤은 미친 듯이 놀자",
        notes: [
          { k: "grammar", w: "명령문", e: "주어 없이 동사 원형으로 시작(Sleep ~, go ~). 명령뿐 아니라 '~하자, ~해' 권유에도 씁니다." },
          { k: "idiom", w: "go crazy", e: "go + 형용사 = '~한 상태가 되다'. go crazy(미치다/신나게 놀다), go bad(상하다), go blind(눈이 멀다)." },
        ] },
    ] },

  // ───────────────────────── 일본어
  {
    id: "ja-lemon", lang: "ja", lv: 2,
    title: "Lemon", artist: "米津玄師 (Kenshi Yonezu)", year: 2018,
    yt: "SX_ViT4Ra7k",
    intro: "일본 역대 최다 스트리밍 곡 중 하나(드라마 '언내추럴' 주제가). 문어적 가정(ならば), 추측(でしょう), 비유(ように) 등 초·중급 핵심 문법이 가득합니다.",
    lines: [
      { t: "夢ならばどれほどよかったでしょう", r: "ゆめならばどれほどよかったでしょう", ko: "꿈이라면 얼마나 좋았을까요",
        notes: [
          { k: "grammar", w: "〜ならば", e: "'~라면'. なら의 문어적 형태. 명사 + なら(ば). 회화에서는 夢なら가 자연스러움." },
          { k: "vocab", w: "どれほど", e: "'얼마나'. どんなに·どのくらい와 비슷하지만 더 문어적·감정적." },
          { k: "grammar", w: "よかったでしょう", e: "いい의 과거 よかった + でしょう(추측·반어). '좋았겠지요 → 좋았을 텐데'." },
        ] },
      { t: "未だにあなたのことを夢にみる", r: "いまだにあなたのことをゆめにみる", ko: "아직도 당신을 꿈에서 봐요",
        notes: [
          { k: "vocab", w: "未だに(いまだに)", e: "'아직도, 여전히'. まだ보다 '아직도 안 변했다'는 아쉬움 뉘앙스가 강함." },
          { k: "grammar", w: "あなたのこと", e: "사람을 목적어로 할 때 〜のこと를 붙이는 일본어 특유의 표현. 君のことが好き(널 좋아해)." },
          { k: "idiom", w: "夢にみる", e: "'꿈에 보다, 꿈꾸다'. 조사 に에 주의(夢をみる도 가능하지만 뉘앙스가 다름)." },
        ] },
      { t: "忘れた物を取りに帰るように / 古びた思い出の埃を払う", r: "わすれたものをとりにかえるように / ふるびたおもいでのほこりをはらう", ko: "잊은 물건을 가지러 돌아가듯 / 낡은 추억의 먼지를 털어내요",
        notes: [
          { k: "grammar", w: "〜に帰る / 〜に行く", e: "동사 ます형 어간 + に + 이동동사 = '~하러 가다/돌아가다'. 取りに帰る(가지러 돌아가다), 買いに行く(사러 가다)." },
          { k: "grammar", w: "〜ように", e: "'~처럼, ~하듯이'(비유). 동사 보통형 + ように." },
          { k: "vocab", w: "古びた(ふるびた)", e: "古びる(낡다)의 과거형이 명사를 수식. 古い보다 '세월에 바랜' 느낌." },
          { k: "idiom", w: "埃を払う(ほこりをはらう)", e: "'먼지를 털다'. 払う는 '지불하다' 외에 '털어내다' 뜻이 있음." },
        ] },
      { t: "今でもあなたはわたしの光", r: "いまでもあなたはわたしのひかり", ko: "지금도 당신은 나의 빛",
        notes: [
          { k: "grammar", w: "今でも", e: "'지금도(여전히)'. 〜でも는 '~라도, ~조차'로 강조." },
          { k: "grammar", w: "명사로 끝나는 문장", e: "わたしの光(だ)에서 だ·です를 생략. 시·가사·제목에서 흔한 체언 종결." },
        ] },
      { t: "あの日の悲しみさえ あの日の苦しみさえ / そのすべてを愛してた あなたとともに", r: "あのひのかなしみさえ あのひのくるしみさえ / そのすべてをあいしてた あなたとともに", ko: "그날의 슬픔조차 그날의 괴로움조차 / 그 모든 것을 사랑했어, 당신과 함께",
        notes: [
          { k: "grammar", w: "〜さえ", e: "'~조차, ~마저'. 극단적인 예를 들어 강조. 子供さえ知っている(아이조차 안다)." },
          { k: "grammar", w: "悲しみ·苦しみ", e: "형용사 어간 + み → 명사화. 悲しい→悲しみ(슬픔), 苦しい→苦しみ(괴로움), 楽しい→楽しみ(즐거움·기대)." },
          { k: "grammar", w: "愛してた", e: "愛していた에서 い가 빠진 구어형. 〜てた = 〜ていた." },
          { k: "vocab", w: "〜とともに", e: "'~와 함께'(문어). 회화는 〜と一緒に." },
        ] },
    ] },
  {
    id: "ja-pretender", lang: "ja", lv: 3,
    title: "Pretender", artist: "Official髭男dism", year: 2019,
    yt: "TQ8WlA2GXbk",
    intro: "일본 스트리밍 10억 회를 넘긴 대표 J-POP. 가정·후회 표현(〜ば, 〜たらよかった)과 〜難い, 〜通り 같은 중급 접미 표현을 배울 수 있습니다.",
    lines: [
      { t: "君とのラブストーリー / それは予想通り", r: "きみとのらぶすとーりー / それはよそうどおり", ko: "너와의 러브스토리 / 그건 예상대로",
        notes: [
          { k: "grammar", w: "君との", e: "と(~와) + の(~의) = '~와의'. 友達との約束(친구와의 약속)." },
          { k: "grammar", w: "〜通り(どおり)", e: "'~대로'. 명사 뒤에 붙으면 とおり→どおり로 연탁. 予想通り(예상대로), 計画通り(계획대로)." },
        ] },
      { t: "いざ始まればひとり芝居だ", r: "いざはじまればひとりしばいだ", ko: "막상 시작되면 혼자 하는 연극이야",
        notes: [
          { k: "vocab", w: "いざ", e: "'막상, 정작(~하려고 하면)'. いざとなると(막상 때가 되면)." },
          { k: "grammar", w: "〜ば", e: "가정형. 始まる→始まれば(시작되면). 5단동사는 어미를 え단으로 바꾸고 ば." },
          { k: "idiom", w: "ひとり芝居(しばい)", e: "1인극 → 상대는 모르는 '혼자만의 짝사랑'을 비유." },
        ] },
      { t: "グッバイ / 君の運命のヒトは僕じゃない", r: "ぐっばい / きみのうんめいのひとはぼくじゃない", ko: "굿바이 / 너의 운명의 사람은 내가 아니야",
        notes: [
          { k: "vocab", w: "運命のヒト", e: "'운명의 상대'. 人을 가타카나 ヒト로 쓴 건 강조·거리감을 주는 가사 기법." },
          { k: "grammar", w: "〜じゃない", e: "ではない의 구어 부정. 명사·な형용사 부정에 사용. 僕じゃない(내가 아니야)." },
        ] },
      { t: "辛いけど否めない でも離れ難いのさ", r: "つらいけどいなめない でもはなれがたいのさ", ko: "괴롭지만 부정할 수 없어, 그래도 떨어지기 힘든 거야",
        notes: [
          { k: "idiom", w: "否めない(いなめない)", e: "'부정할 수 없다'. 否む(부정하다)의 가능형 부정. 사실을 인정할 때 쓰는 문어 표현." },
          { k: "grammar", w: "〜難い(がたい)", e: "동사 ます형 어간 + がたい = '~하기 어렵다(심리적으로)'. 離れがたい, 信じがたい(믿기 어렵다), 忘れがたい." },
          { k: "grammar", w: "〜のさ", e: "のだ(설명) + さ(남성적 종조사). '~인 거야'." },
        ] },
      { t: "もっと違う設定で もっと違う関係で / 出会える世界線 選べたらよかった", r: "もっとちがうせっていで もっとちがうかんけいで / であえるせかいせん えらべたらよかった", ko: "좀 더 다른 설정으로, 좀 더 다른 관계로 / 만날 수 있는 세계선을 고를 수 있었다면 좋았을 텐데",
        notes: [
          { k: "vocab", w: "世界線(せかいせん)", e: "SF·애니 용어 '세계선'(평행세계의 한 갈래). 일상 대화에도 '다른 세계선이었다면'처럼 쓰임." },
          { k: "grammar", w: "出会える / 選べたら", e: "가능형. 出会う→出会える(만날 수 있다), 選ぶ→選べる→選べたら(고를 수 있었다면)." },
          { k: "grammar", w: "〜たらよかった", e: "'~했으면 좋았을 텐데'(후회). 〜ばよかった도 같은 뜻." },
        ] },
    ] },
  {
    id: "ja-idol", lang: "ja", lv: 3,
    title: "アイドル", artist: "YOASOBI", year: 2023,
    yt: "ZRtdQ81jPUQ",
    intro: "2023년 빌보드 글로벌(미국 제외) 1위를 한 첫 일본어 곡. 빠른 랩 파트에 な형용사 연결, 〜的, 수동형 관용구가 쏟아집니다.",
    lines: [
      { t: "無敵の笑顔で荒らすメディア", r: "むてきのえがおであらすめでぃあ", ko: "무적의 미소로 미디어를 휩쓸어",
        notes: [
          { k: "vocab", w: "無敵(むてき)", e: "무적. 無(む) + 敵(てき). 無料·無理처럼 無〜 접두어 패턴." },
          { k: "vocab", w: "荒らす(あらす)", e: "'어지럽히다, 휩쓸다'. 타동사. 자동사는 荒れる(거칠어지다)." },
          { k: "grammar", w: "수식 어순", e: "[荒らす]メディア처럼 동사가 명사 앞에 와서 꾸밉니다 = '휩쓰는 미디어'. 가사에서는 어순을 뒤집어 리듬을 맞춤." },
        ] },
      { t: "知りたいその秘密ミステリアス", r: "しりたいそのひみつみすてりあす", ko: "알고 싶은 그 비밀, 미스터리어스",
        notes: [
          { k: "grammar", w: "〜たい", e: "희망. 知る→知りたい(알고 싶다). 동사 ます형 어간 + たい." },
          { k: "vocab", w: "ミステリアス", e: "mysterious의 가타카나 외래어. 가타카나 단어는 영어를 알면 뜻을 추측할 수 있는 경우가 많음." },
        ] },
      { t: "あれもないないない / これもないないない", r: "あれもないないない / これもないないない", ko: "그것도 없어 없어 없어 / 이것도 없어 없어 없어",
        notes: [
          { k: "grammar", w: "あれ·これ·それ", e: "지시대명사: これ(이것, 내 쪽), それ(그것, 상대 쪽), あれ(저것, 둘 다 먼 것)." },
          { k: "grammar", w: "〜も", e: "'~도'. あれも これも = 그것도 이것도." },
          { k: "vocab", w: "ない", e: "'없다/아니다'. 반복해서 '전혀 없다'를 리듬감 있게 강조." },
        ] },
      { t: "完璧で嘘つきな君は / 天才的なアイドル様", r: "かんぺきでうそつきなきみは / てんさいてきなあいどるさま", ko: "완벽하고 거짓말쟁이인 너는 / 천재적인 아이돌 님",
        notes: [
          { k: "grammar", w: "な형용사의 で 연결", e: "完璧で = '완벽하고'. な형용사·명사를 연결할 때 で를 씁니다. 静かできれいな町." },
          { k: "vocab", w: "嘘つき(うそつき)", e: "거짓말쟁이. 嘘(거짓말) + つき(〜하는 사람). 嘘つきな 처럼 な형용사처럼도 쓰임." },
          { k: "grammar", w: "〜的(てき)な", e: "한자어 + 的 = '~적인'. 天才的(천재적), 具体的(구체적). な형용사로 활용." },
          { k: "vocab", w: "〜様(さま)", e: "최고 존칭(お客様). 여기서는 과장·비꼬는 뉘앙스." },
        ] },
      { t: "誰もが目を奪われていく", r: "だれもがめをうばわれていく", ko: "누구나 눈을 빼앗기고 말아",
        notes: [
          { k: "grammar", w: "誰もが", e: "'누구나 다'. 誰も + が. 긍정문에서 '모두'를 뜻함(부정문의 誰も〜ない는 '아무도 ~않다')." },
          { k: "idiom", w: "目を奪われる", e: "'눈을 빼앗기다' = 매료되다. 奪う(빼앗다)의 수동형 奪われる." },
          { k: "grammar", w: "〜ていく", e: "변화가 진행·확산되는 느낌. '점점 ~해 가다'." },
        ] },
    ] },

  // ───────────────────────── 중국어
  {
    id: "zh-gaobai-qiqiu", lang: "zh", lv: 2,
    title: "告白气球 (告白氣球)", artist: "周杰伦 Jay Chou", year: 2016,
    yt: "bu7nU9Mhpyo",
    intro: "중화권 스트리밍 차트에 수년간 머문 대표 러브송. 사역 让, 결과보어 爱上, 성어 知难而退 등 중급 문법을 쉽고 달콤한 가사로 익힐 수 있습니다.",
    lines: [
      { t: "塞纳河畔 左岸的咖啡 / 我手一杯 品尝你的美", r: "Sàinàhé pàn zuǒ'àn de kāfēi / wǒ shǒu yì bēi pǐncháng nǐ de měi", ko: "센강 기슭, 좌안의 커피 / 손에 한 잔 들고 너의 아름다움을 음미해",
        notes: [
          { k: "vocab", w: "河畔(hépàn)", e: "강가, 강기슭. 畔은 문어적. 江边·河边이 더 일상적." },
          { k: "vocab", w: "左岸(zuǒ'àn)", e: "파리 센강의 좌안(예술가의 거리). 병음에서 모음 앞 음절 경계는 어깨점(zuǒ'àn)으로 표시." },
          { k: "grammar", w: "一杯(yì bēi)", e: "양사 杯(잔). 一는 뒤 음절이 1·2·3성이면 4성(yì), 4성이면 2성(yí)으로 변조." },
          { k: "grammar", w: "你的美", e: "형용사 美가 的 뒤에서 명사처럼 쓰임('너의 아름다움')." },
        ] },
      { t: "亲爱的 爱上你 从那天起 / 甜蜜的很轻易", r: "qīn'ài de ài shàng nǐ cóng nà tiān qǐ / tiánmì de hěn qīngyì", ko: "사랑하는 그대, 너를 사랑하게 된 그날부터 / 달콤함은 아주 쉬웠어",
        notes: [
          { k: "vocab", w: "亲爱的(qīn'ài de)", e: "연인·가족 호칭 '자기, 여보'. 편지 첫머리 '~에게'로도 씀." },
          { k: "grammar", w: "爱上(ài shàng)", e: "동사 + 上 결과보어: '~하게 되다(시작·달성)'. 爱上你(너를 사랑하게 되다), 迷上(빠지다)." },
          { k: "grammar", w: "从…起(cóng…qǐ)", e: "'~부터'. 从那天起(그날부터), 从今天起(오늘부터)." },
          { k: "grammar", w: "的 / 得", e: "문법적으로는 甜蜜得很轻易(정도보어 得)가 맞지만 가사·구어 표기에서는 的로 자주 혼용됩니다." },
        ] },
      { t: "你说你有点难追 / 想让我知难而退", r: "nǐ shuō nǐ yǒudiǎn nán zhuī / xiǎng ràng wǒ zhī nán ér tuì", ko: "넌 네가 좀 사귀기 어렵다고 했지 / 내가 어려운 걸 알고 물러나길 바라며",
        notes: [
          { k: "grammar", w: "有点(yǒudiǎn)", e: "'조금 ~하다'(부정적·불만 뉘앙스, 형용사 앞). 一点儿은 명사 뒤·비교 표현(便宜一点)." },
          { k: "grammar", w: "难 + 동사", e: "'~하기 어렵다'. 难追(쫓기 어렵다 → 사귀기 어렵다), 难说(말하기 어렵다), 难懂." },
          { k: "vocab", w: "追(zhuī)", e: "'쫓다'에서 '구애하다, 따라다니다'로 확장. 追剧(드라마 정주행)도 같은 글자." },
          { k: "grammar", w: "让(ràng)", e: "사역 '~하게 하다'. 让我 + 동사 = 내가 ~하게 하다." },
          { k: "idiom", w: "知难而退(zhī nán ér tuì)", e: "성어: 어려움을 알고 물러나다. 반대는 知难而进." },
        ] },
      { t: "礼物不需挑最贵 / 只要香榭的落叶", r: "lǐwù bù xū tiāo zuì guì / zhǐyào Xiāngxiè de luòyè", ko: "선물은 가장 비싼 걸 고를 필요 없어 / 샹젤리제의 낙엽만 있으면 돼",
        notes: [
          { k: "grammar", w: "不需(bù xū)", e: "= 不需要, '~할 필요 없다'. 不用과 같은 뜻." },
          { k: "grammar", w: "最(zuì)", e: "최상급 '가장'. 最贵(가장 비싸다), 最好." },
          { k: "grammar", w: "只要(zhǐyào)", e: "'~하기만 하면, ~만 있으면'. 只要…就…(~하면 곧 ~)로 자주 호응." },
          { k: "vocab", w: "香榭(Xiāngxiè)", e: "香榭丽舍(샹젤리제)의 줄임. 외래 지명 음역." },
        ] },
      { t: "亲爱的 别任性 / 你的眼睛 在说我愿意", r: "qīn'ài de bié rènxìng / nǐ de yǎnjing zài shuō wǒ yuànyì", ko: "자기, 고집부리지 마 / 네 눈이 '좋아요'라고 말하고 있어",
        notes: [
          { k: "grammar", w: "别(bié)", e: "금지 '~하지 마'. = 不要. 别任性(제멋대로 하지 마)." },
          { k: "vocab", w: "任性(rènxìng)", e: "제멋대로 하다, 고집부리다." },
          { k: "grammar", w: "在 + 동사", e: "진행 '~하고 있다'. 在说(말하고 있다). 正在로 강조." },
          { k: "idiom", w: "我愿意(wǒ yuànyì)", e: "결혼 승낙 'I do'의 중국어 표현. 愿意 = 기꺼이 ~하다." },
        ] },
    ] },
  {
    id: "zh-guangnian-zhiwai", lang: "zh", lv: 3,
    title: "光年之外", artist: "G.E.M. 邓紫棋", year: 2016,
    yt: "KqVN10ICaE0",
    intro: "영화 '패신저스' 중국어 주제가로 유튜브·스포티파이 중화권 장기 인기곡. 문어 방위사 之外, 반전 부사 却, 4자 표현이 많아 중급 독해에 좋습니다.",
    lines: [
      { t: "感受停在我发端的指尖", r: "gǎnshòu tíng zài wǒ fàduān de zhǐjiān", ko: "내 머리끝에 멈춘 손끝을 느껴",
        notes: [
          { k: "vocab", w: "感受(gǎnshòu)", e: "느끼다, 체감하다. 感觉보다 깊이 '받아 느끼는' 뉘앙스." },
          { k: "grammar", w: "停在 + 장소", e: "동사 + 在 + 장소 = '~에 머물러 있다'. 停在门口(문 앞에 멈추다)." },
          { k: "vocab", w: "发(fà / fā)", e: "다음자. fà = 머리카락(头发), fā = 보내다·발생하다(发烧, 发邮件)." },
        ] },
      { t: "如何瞬间冻结时间", r: "rúhé shùnjiān dòngjié shíjiān", ko: "어떻게 순간을 얼려 시간을 멈출까",
        notes: [
          { k: "vocab", w: "如何(rúhé)", e: "'어떻게'의 문어체. 회화는 怎么." },
          { k: "vocab", w: "瞬间(shùnjiān)", e: "순간. 一瞬间(한순간에)." },
          { k: "vocab", w: "冻结(dòngjié)", e: "동결하다. 비유적으로 '시간을 멈추다', 금융에서 '계좌를 동결하다'." },
        ] },
      { t: "缘分让我们相遇乱世以外 / 命运却要我们危难中相爱", r: "yuánfèn ràng wǒmen xiāngyù luànshì yǐwài / mìngyùn què yào wǒmen wēinàn zhōng xiāng'ài", ko: "인연이 우리를 난세 밖에서 만나게 했고 / 운명은 오히려 위난 속에서 사랑하게 하네",
        notes: [
          { k: "vocab", w: "缘分(yuánfèn)", e: "인연. 중국 문화의 핵심 단어. 有缘(인연이 있다), 缘分天注定." },
          { k: "grammar", w: "让 / 要 + 사람 + 동사", e: "사역. 让我们相遇(우리를 만나게 하다), 要我们相爱(우리로 하여금 사랑하게 하다)." },
          { k: "grammar", w: "相(xiāng) + 동사", e: "'서로 ~하다'. 相遇(서로 만나다), 相爱(서로 사랑하다), 相信(믿다)." },
          { k: "grammar", w: "却(què)", e: "'그러나, 오히려'. 주어 뒤에 위치하는 반전 부사(但是는 문장 앞)." },
          { k: "grammar", w: "…以外 / …中", e: "방위사. 乱世以外(난세 밖), 危难中(위난 속). 명사 뒤에 붙어 위치·범위 표현." },
        ] },
      { t: "也许未来遥远在光年之外 / 我愿守候未知里为你等待", r: "yěxǔ wèilái yáoyuǎn zài guāngnián zhī wài / wǒ yuàn shǒuhòu wèizhī lǐ wèi nǐ děngdài", ko: "어쩌면 미래는 광년 밖 저 멀리 있겠지만 / 나는 미지 속에서 너를 위해 기다리겠어",
        notes: [
          { k: "vocab", w: "也许(yěxǔ)", e: "'어쩌면, 아마'. 可能·大概와 비슷." },
          { k: "grammar", w: "之外(zhī wài)", e: "문어 '~의 밖'. 之는 고전 중국어의 的. 光年之外(광년 밖), 意料之外(예상 밖)." },
          { k: "vocab", w: "愿(yuàn)", e: "기꺼이 ~하다, 바라다. 我愿 = 我愿意의 문어 축약." },
          { k: "vocab", w: "守候(shǒuhòu)", e: "지키며 기다리다. 等待보다 '곁을 지킨다' 뉘앙스." },
          { k: "grammar", w: "为你(wèi nǐ)", e: "'너를 위해'. 为가 '위하여'일 때는 4성 wèi." },
        ] },
      { t: "我没想到为了你我能疯狂到 / 山崩海啸没有你根本不想逃", r: "wǒ méi xiǎngdào wèile nǐ wǒ néng fēngkuáng dào / shānbēng hǎixiào méiyǒu nǐ gēnběn bù xiǎng táo", ko: "너를 위해 이렇게까지 미칠 수 있을 줄은 몰랐어 / 산이 무너지고 해일이 와도 네가 없으면 도망칠 생각조차 없어",
        notes: [
          { k: "idiom", w: "没想到(méi xiǎngdào)", e: "'~일 줄 몰랐다, 생각지도 못했다'. 想到 = 생각이 미치다." },
          { k: "grammar", w: "为了(wèile)", e: "'~를 위해'(목적). 为了你(너를 위해), 为了健康." },
          { k: "grammar", w: "형용사 + 到", e: "'~할 정도로'. 疯狂到(…할 정도로 미치다). 뒤에 정도를 설명하는 절이 옴." },
          { k: "idiom", w: "山崩海啸(shānbēng hǎixiào)", e: "산사태와 해일 → '큰 재난, 천지가 뒤집혀도'. 4자 대구 표현." },
          { k: "grammar", w: "根本不(gēnběn bù)", e: "'전혀 ~않다, 애초에 ~않다'. 강한 부정." },
        ] },
    ] },
  {
    id: "zh-xiao-xingyun", lang: "zh", lv: 2,
    title: "小幸运 (小幸運)", artist: "田馥甄 Hebe Tien", year: 2015,
    yt: "_sQSXwdtxlY",
    intro: "영화 '나의 소녀시대' 주제가로 중화권 노래방·스트리밍 단골 1위곡. 결과보어(听见·留住), 了…才, 성어 刻骨铭心 등 초중급 핵심이 담겨 있습니다.",
    lines: [
      { t: "我听见雨滴落在青青草地 / 我听见远方下课钟声响起", r: "wǒ tīngjiàn yǔdī luò zài qīngqīng cǎodì / wǒ tīngjiàn yuǎnfāng xiàkè zhōngshēng xiǎngqǐ", ko: "빗방울이 푸른 풀밭에 떨어지는 소리를 들어 / 멀리서 수업 끝 종소리가 울리는 걸 들어",
        notes: [
          { k: "grammar", w: "听见(tīngjiàn)", e: "听(듣다) + 见(결과보어: 감각이 도달) = '들리다, 듣게 되다'. 看见(보이다)도 같은 구조." },
          { k: "grammar", w: "青青(qīngqīng)", e: "형용사 중첩 → 생동감 있는 묘사. 红红的脸(붉디붉은 얼굴)." },
          { k: "vocab", w: "下课(xiàkè)", e: "수업이 끝나다. 上课(수업하다)의 반대. 上班/下班(출근/퇴근)과 같은 짝." },
          { k: "grammar", w: "响起(xiǎngqǐ)", e: "울리기 시작하다. 起는 '시작'을 나타내는 방향보어. 想起(생각나다)." },
        ] },
      { t: "可是我没有听见你的声音 / 认真呼唤我姓名", r: "kěshì wǒ méiyǒu tīngjiàn nǐ de shēngyīn / rènzhēn hūhuàn wǒ xìngmíng", ko: "하지만 네 목소리는 듣지 못했어 / 진지하게 내 이름을 부르는",
        notes: [
          { k: "grammar", w: "可是(kěshì)", e: "'하지만'. 但是와 거의 같으며 구어적." },
          { k: "grammar", w: "没有 + 동사", e: "과거·완료의 부정 '~하지 않았다'. 不는 의지·습관 부정, 没有는 발생 부정." },
          { k: "vocab", w: "呼唤(hūhuàn)", e: "부르다(문어·감성적). 일상에서는 叫." },
          { k: "vocab", w: "姓名(xìngmíng)", e: "성명(성+이름). 서류용 표현이며 구어는 名字." },
        ] },
      { t: "爱上你的时候还不懂感情 / 离别了才觉得刻骨铭心", r: "ài shàng nǐ de shíhou hái bù dǒng gǎnqíng / líbié le cái juéde kègǔ-míngxīn", ko: "너를 사랑하게 됐을 땐 아직 감정을 몰랐고 / 헤어진 뒤에야 뼈에 새겨진 듯 사무쳐",
        notes: [
          { k: "grammar", w: "…的时候", e: "'~할 때'. 동사구 + 的时候. 吃饭的时候(밥 먹을 때)." },
          { k: "grammar", w: "还不(hái bù)", e: "'아직 ~않다'. 还 = 아직, 여전히." },
          { k: "grammar", w: "…了才…", e: "'~하고 나서야 비로소'. 才는 '늦게/겨우'의 뉘앙스. 离别了才觉得 = 헤어지고 나서야 느낀다." },
          { k: "idiom", w: "刻骨铭心(kègǔ míngxīn)", e: "성어: 뼈에 새기고 마음에 새기다 = 영원히 잊지 못하다." },
        ] },
      { t: "原来你是我最想留住的幸运 / 原来我们和爱情曾经靠得那么近", r: "yuánlái nǐ shì wǒ zuì xiǎng liúzhù de xìngyùn / yuánlái wǒmen hé àiqíng céngjīng kào de nàme jìn", ko: "알고 보니 너는 내가 가장 붙잡고 싶었던 행운 / 알고 보니 우린 사랑과 그렇게 가까이 있었구나",
        notes: [
          { k: "grammar", w: "原来(yuánlái)", e: "'알고 보니, 원래'. 몰랐던 사실을 깨달았을 때 문장 앞에." },
          { k: "grammar", w: "留住(liúzhù)", e: "留(남기다) + 住(결과보어: 고정·유지) = '붙잡아 두다'. 记住(기억해 두다), 站住(멈춰 서다)." },
          { k: "vocab", w: "曾经(céngjīng)", e: "'한때, 예전에'. 과거의 경험·상태. 曾经爱过(사랑한 적 있다)." },
          { k: "grammar", w: "靠得那么近", e: "동사 + 得 + 정도 = '그렇게 가깝게 다가가다'. 정도보어 구조(跑得快, 说得好)." },
        ] },
      { t: "青春是段跌跌撞撞的旅行 / 拥有着后知后觉的美丽", r: "qīngchūn shì duàn diēdiē-zhuàngzhuàng de lǚxíng / yōngyǒu zhe hòuzhī-hòujué de měilì", ko: "청춘은 비틀거리고 부딪히는 한 토막의 여행 / 뒤늦게 깨닫는 아름다움을 지닌",
        notes: [
          { k: "grammar", w: "段(duàn)", e: "양사: 구간·토막. 一段旅行(한 차례의 여행), 一段时间(한동안). 가사에선 一가 생략." },
          { k: "grammar", w: "跌跌撞撞(diēdiē zhuàngzhuàng)", e: "AABB형 중첩: 넘어지고 부딪히며(비틀비틀). 동사 중첩으로 상태를 생생하게." },
          { k: "grammar", w: "着(zhe)", e: "동작·상태의 지속. 拥有着 = 지니고 있다. 看着(보고 있다)." },
          { k: "idiom", w: "后知后觉(hòuzhī hòujué)", e: "성어: 뒤늦게 알고 뒤늦게 깨닫다. 先知先觉의 반대." },
        ] },
    ] },
];
