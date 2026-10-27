// 문장 데이터. 형식: S(id, 상황, 레벨, 한국어, 영어, IPA, 중국어, 병음, 일본어, 요미(히라가나))
// id는 절대 바꾸지 마세요. 새 문장은 새로운 id로 뒤에 추가하세요.
(function () {
  const list = [];
  function S(id, sit, lv, ko, en, ipa, zh, py, ja, yomi) {
    list.push({ id, type: "sentence", sit, lv, ko, en, ipa, zh, py, ja, yomi });
  }
  // ── 인사·기본
  S("s-greet01", "greet", 1, "안녕하세요, 처음 뵙겠습니다.", "Hello, nice to meet you.", "həˈloʊ, naɪs tə miːt juː", "你好，很高兴认识你。", "nǐ hǎo, hěn gāoxìng rènshi nǐ", "こんにちは、はじめまして。", "こんにちは、はじめまして");
  S("s-greet02", "greet", 1, "제 이름은 민수입니다.", "My name is Minsu.", "maɪ neɪm ɪz ˈmɪnsuː", "我叫民秀。", "wǒ jiào Mínxiù", "私の名前はミンスです。", "わたしのなまえはみんすです");
  S("s-greet03", "greet", 1, "저는 한국에서 왔어요.", "I'm from Korea.", "aɪm frəm kəˈriːə", "我来自韩国。", "wǒ láizì Hánguó", "私は韓国から来ました。", "わたしはかんこくからきました");
  S("s-greet04", "greet", 1, "잘 지내세요?", "How are you?", "haʊ ɑːr juː", "你好吗？", "nǐ hǎo ma", "お元気ですか？", "おげんきですか");
  S("s-greet05", "greet", 2, "다시 한 번 말해 주세요.", "Could you say that again?", "kʊd juː seɪ ðæt əˈɡen", "请再说一遍。", "qǐng zài shuō yí biàn", "もう一度言ってください。", "もういちどいってください");
  S("s-greet06", "greet", 2, "한국어 할 수 있어요?", "Can you speak Korean?", "kæn juː spiːk kəˈriːən", "你会说韩语吗？", "nǐ huì shuō Hányǔ ma", "韓国語を話せますか？", "かんこくごをはなせますか");
  // ── 공항·여행
  S("s-travel01", "travel", 2, "여권을 보여 주세요.", "Please show me your passport.", "pliːz ʃoʊ miː jʊr ˈpæspɔːrt", "请出示您的护照。", "qǐng chūshì nín de hùzhào", "パスポートを見せてください。", "ぱすぽーとをみせてください");
  S("s-travel02", "travel", 1, "탑승구가 어디예요?", "Where is the gate?", "wer ɪz ðə ɡeɪt", "登机口在哪里？", "dēngjīkǒu zài nǎli", "搭乗口はどこですか？", "とうじょうぐちはどこですか");
  S("s-travel03", "travel", 2, "관광하러 왔어요.", "I'm here for sightseeing.", "aɪm hɪr fər ˈsaɪtsiːɪŋ", "我是来观光的。", "wǒ shì lái guānguāng de", "観光で来ました。", "かんこうできました");
  S("s-travel04", "travel", 2, "3일 동안 머물 거예요.", "I'll stay for three days.", "aɪl steɪ fər θriː deɪz", "我要住三天。", "wǒ yào zhù sān tiān", "三日間滞在します。", "みっかかんたいざいします");
  S("s-travel05", "travel", 3, "제 짐이 안 나왔어요.", "My luggage didn't come out.", "maɪ ˈlʌɡɪdʒ ˈdɪdnt kʌm aʊt", "我的行李没出来。", "wǒ de xíngli méi chūlái", "荷物が出てきません。", "にもつがでてきません");
  S("s-travel06", "travel", 2, "환전은 어디서 해요?", "Where can I exchange money?", "wer kæn aɪ ɪksˈtʃeɪndʒ ˈmʌni", "在哪里可以换钱？", "zài nǎli kěyǐ huànqián", "どこで両替できますか？", "どこでりょうがえできますか");
  // ── 식당·음식
  S("s-food01", "food", 1, "메뉴 좀 주세요.", "Can I have the menu, please?", "kæn aɪ hæv ðə ˈmenjuː pliːz", "请给我菜单。", "qǐng gěi wǒ càidān", "メニューをください。", "めにゅーをください");
  S("s-food02", "food", 1, "이거 하나 주세요.", "I'll have this one, please.", "aɪl hæv ðɪs wʌn pliːz", "请给我一个这个。", "qǐng gěi wǒ yí ge zhège", "これを一つください。", "これをひとつください");
  S("s-food03", "food", 2, "추천 메뉴가 뭐예요?", "What do you recommend?", "wʌt duː juː ˌrekəˈmend", "你推荐什么？", "nǐ tuījiàn shénme", "おすすめは何ですか？", "おすすめはなんですか");
  S("s-food04", "food", 2, "너무 맵지 않게 해 주세요.", "Please don't make it too spicy.", "pliːz doʊnt meɪk ɪt tuː ˈspaɪsi", "请不要太辣。", "qǐng búyào tài là", "あまり辛くしないでください。", "あまりからくしないでください");
  S("s-food05", "food", 1, "계산해 주세요.", "Check, please.", "tʃek pliːz", "买单。", "mǎidān", "お会計をお願いします。", "おかいけいをおねがいします");
  S("s-food06", "food", 1, "정말 맛있었어요.", "It was really delicious.", "ɪt wəz ˈrɪəli dɪˈlɪʃəs", "真好吃。", "zhēn hǎochī", "とても美味しかったです。", "とてもおいしかったです");
  // ── 쇼핑
  S("s-shop01", "shop", 1, "이거 얼마예요?", "How much is this?", "haʊ mʌtʃ ɪz ðɪs", "这个多少钱？", "zhège duōshao qián", "これはいくらですか？", "これはいくらですか");
  S("s-shop02", "shop", 1, "너무 비싸요.", "It's too expensive.", "ɪts tuː ɪkˈspensɪv", "太贵了。", "tài guì le", "高すぎます。", "たかすぎます");
  S("s-shop03", "shop", 2, "좀 깎아 주세요.", "Can you give me a discount?", "kæn juː ɡɪv miː ə ˈdɪskaʊnt", "可以便宜一点吗？", "kěyǐ piányi yìdiǎn ma", "少し安くしてもらえますか？", "すこしやすくしてもらえますか");
  S("s-shop04", "shop", 2, "카드로 결제할 수 있어요?", "Can I pay by card?", "kæn aɪ peɪ baɪ kɑːrd", "可以刷卡吗？", "kěyǐ shuākǎ ma", "カードで払えますか？", "かーどではらえますか");
  S("s-shop05", "shop", 2, "다른 색깔 있어요?", "Do you have another color?", "duː juː hæv əˈnʌðər ˈkʌlər", "有别的颜色吗？", "yǒu bié de yánsè ma", "他の色はありますか？", "ほかのいろはありますか");
  S("s-shop06", "shop", 2, "입어 봐도 돼요?", "Can I try it on?", "kæn aɪ traɪ ɪt ɑːn", "可以试穿吗？", "kěyǐ shìchuān ma", "試着してもいいですか？", "しちゃくしてもいいですか");
  // ── 숙박
  S("s-hotel01", "hotel", 1, "예약했어요.", "I have a reservation.", "aɪ hæv ə ˌrezərˈveɪʃn", "我预订了房间。", "wǒ yùdìng le fángjiān", "予約しています。", "よやくしています");
  S("s-hotel02", "hotel", 1, "체크인 하고 싶어요.", "I'd like to check in.", "aɪd laɪk tə tʃek ɪn", "我想入住。", "wǒ xiǎng rùzhù", "チェックインしたいです。", "ちぇっくいんしたいです");
  S("s-hotel03", "hotel", 2, "와이파이 비밀번호가 뭐예요?", "What's the Wi-Fi password?", "wʌts ðə ˈwaɪfaɪ ˈpæswɜːrd", "无线网络密码是什么？", "wúxiàn wǎngluò mìmǎ shì shénme", "Wi-Fiのパスワードは何ですか？", "わいふぁいのぱすわーどはなんですか");
  S("s-hotel04", "hotel", 1, "아침 식사는 몇 시예요?", "What time is breakfast?", "wʌt taɪm ɪz ˈbrekfəst", "早餐几点？", "zǎocān jǐ diǎn", "朝食は何時ですか？", "ちょうしょくはなんじですか");
  S("s-hotel05", "hotel", 2, "에어컨이 안 돼요.", "The air conditioner doesn't work.", "ði er kənˈdɪʃənər ˈdʌznt wɜːrk", "空调坏了。", "kōngtiáo huài le", "エアコンが動きません。", "えあこんがうごきません");
  S("s-hotel06", "hotel", 3, "하루 더 묵을 수 있어요?", "Can I stay one more night?", "kæn aɪ steɪ wʌn mɔːr naɪt", "可以再住一晚吗？", "kěyǐ zài zhù yì wǎn ma", "もう一泊できますか？", "もういっぱくできますか");
  // ── 교통·길찾기
  S("s-transit01", "transit", 1, "역이 어디예요?", "Where is the station?", "wer ɪz ðə ˈsteɪʃn", "车站在哪里？", "chēzhàn zài nǎli", "駅はどこですか？", "えきはどこですか");
  S("s-transit02", "transit", 1, "여기로 가 주세요.", "Please take me here.", "pliːz teɪk miː hɪr", "请带我去这里。", "qǐng dài wǒ qù zhèli", "ここまでお願いします。", "ここまでおねがいします");
  S("s-transit03", "transit", 2, "얼마나 걸려요?", "How long does it take?", "haʊ lɔːŋ dʌz ɪt teɪk", "需要多长时间？", "xūyào duō cháng shíjiān", "どのくらいかかりますか？", "どのくらいかかりますか");
  S("s-transit04", "transit", 1, "여기서 내려요.", "I'll get off here.", "aɪl ɡet ɔːf hɪr", "我在这里下车。", "wǒ zài zhèli xiàchē", "ここで降ります。", "ここでおります");
  S("s-transit05", "transit", 3, "어디서 갈아타야 해요?", "Where should I transfer?", "wer ʃʊd aɪ trænsˈfɜːr", "我应该在哪里换乘？", "wǒ yīnggāi zài nǎli huànchéng", "どこで乗り換えればいいですか？", "どこでのりかえればいいですか");
  S("s-transit06", "transit", 2, "막차는 몇 시예요?", "What time is the last train?", "wʌt taɪm ɪz ðə læst treɪn", "末班车几点？", "mòbānchē jǐ diǎn", "終電は何時ですか？", "しゅうでんはなんじですか");
  // ── 병원·긴급
  S("s-health01", "health", 1, "도와주세요!", "Help!", "help", "救命！", "jiùmìng", "助けて！", "たすけて");
  S("s-health02", "health", 1, "머리가 아파요.", "I have a headache.", "aɪ hæv ə ˈhedeɪk", "我头疼。", "wǒ tóu téng", "頭が痛いです。", "あたまがいたいです");
  S("s-health03", "health", 1, "열이 있어요.", "I have a fever.", "aɪ hæv ə ˈfiːvər", "我发烧了。", "wǒ fāshāo le", "熱があります。", "ねつがあります");
  S("s-health04", "health", 2, "병원에 가야 해요.", "I need to go to the hospital.", "aɪ niːd tə ɡoʊ tə ðə ˈhɑːspɪtl", "我需要去医院。", "wǒ xūyào qù yīyuàn", "病院に行かなければなりません。", "びょういんにいかなければなりません");
  S("s-health05", "health", 2, "구급차를 불러 주세요.", "Please call an ambulance.", "pliːz kɔːl ən ˈæmbjələns", "请叫救护车。", "qǐng jiào jiùhùchē", "救急車を呼んでください。", "きゅうきゅうしゃをよんでください");
  S("s-health06", "health", 3, "저는 땅콩 알레르기가 있어요.", "I'm allergic to peanuts.", "aɪm əˈlɜːrdʒɪk tə ˈpiːnʌts", "我对花生过敏。", "wǒ duì huāshēng guòmǐn", "私はピーナッツアレルギーがあります。", "わたしはぴーなっつあれるぎーがあります");
  // ── 직장·비즈니스
  S("s-work01", "work", 2, "회의는 몇 시에 시작해요?", "What time does the meeting start?", "wʌt taɪm dʌz ðə ˈmiːtɪŋ stɑːrt", "会议几点开始？", "huìyì jǐ diǎn kāishǐ", "会議は何時に始まりますか？", "かいぎはなんじにはじまりますか");
  S("s-work02", "work", 2, "이메일을 보내 드리겠습니다.", "I'll send you an email.", "aɪl send juː ən ˈiːmeɪl", "我会给您发邮件。", "wǒ huì gěi nín fā yóujiàn", "メールをお送りします。", "めーるをおおくりします");
  S("s-work03", "work", 2, "제 명함입니다.", "Here is my business card.", "hɪr ɪz maɪ ˈbɪznəs kɑːrd", "这是我的名片。", "zhè shì wǒ de míngpiàn", "私の名刺です。", "わたしのめいしです");
  S("s-work04", "work", 2, "마감이 언제예요?", "When is the deadline?", "wen ɪz ðə ˈdedlaɪn", "截止日期是什么时候？", "jiézhǐ rìqī shì shénme shíhou", "締め切りはいつですか？", "しめきりはいつですか");
  S("s-work05", "work", 1, "잘 부탁드립니다.", "I look forward to working with you.", "aɪ lʊk ˈfɔːrwərd tə ˈwɜːrkɪŋ wɪð juː", "请多多指教。", "qǐng duōduō zhǐjiào", "よろしくお願いします。", "よろしくおねがいします");
  S("s-work06", "work", 3, "자료를 확인해 주시겠어요?", "Could you check the documents?", "kʊd juː tʃek ðə ˈdɑːkjəmənts", "您能确认一下资料吗？", "nín néng quèrèn yíxià zīliào ma", "資料を確認していただけますか？", "しりょうをかくにんしていただけますか");
  // ── 가족·집
  S("s-home01", "home", 1, "가족이 몇 명이에요?", "How many people are in your family?", "haʊ ˈmeni ˈpiːpl ɑːr ɪn jʊr ˈfæməli", "你家有几口人？", "nǐ jiā yǒu jǐ kǒu rén", "家族は何人ですか？", "かぞくはなんにんですか");
  S("s-home02", "home", 1, "저녁 먹었어요?", "Have you had dinner?", "hæv juː hæd ˈdɪnər", "你吃晚饭了吗？", "nǐ chī wǎnfàn le ma", "晩ご飯を食べましたか？", "ばんごはんをたべましたか");
  S("s-home03", "home", 1, "집에 가고 싶어요.", "I want to go home.", "aɪ wɑːnt tə ɡoʊ hoʊm", "我想回家。", "wǒ xiǎng huí jiā", "家に帰りたいです。", "いえにかえりたいです");
  S("s-home04", "home", 1, "화장실은 어디예요?", "Where is the bathroom?", "wer ɪz ðə ˈbæθruːm", "洗手间在哪里？", "xǐshǒujiān zài nǎli", "トイレはどこですか？", "といれはどこですか");
  S("s-home05", "home", 2, "제가 요리할게요.", "I'll cook.", "aɪl kʊk", "我来做饭。", "wǒ lái zuòfàn", "私が料理します。", "わたしがりょうりします");
  S("s-home06", "home", 1, "잘 자요.", "Good night.", "ɡʊd naɪt", "晚安。", "wǎn'ān", "おやすみなさい。", "おやすみなさい");
  // ── 시간·날씨
  S("s-time01", "time", 1, "지금 몇 시예요?", "What time is it now?", "wʌt taɪm ɪz ɪt naʊ", "现在几点？", "xiànzài jǐ diǎn", "今何時ですか？", "いまなんじですか");
  S("s-time02", "time", 1, "오늘 날씨가 좋네요.", "The weather is nice today.", "ðə ˈweðər ɪz naɪs təˈdeɪ", "今天天气真好。", "jīntiān tiānqì zhēn hǎo", "今日はいい天気ですね。", "きょうはいいてんきですね");
  S("s-time03", "time", 2, "내일 비가 올 거예요.", "It will rain tomorrow.", "ɪt wɪl reɪn təˈmɑːroʊ", "明天会下雨。", "míngtiān huì xiàyǔ", "明日は雨が降るでしょう。", "あしたはあめがふるでしょう");
  S("s-time04", "time", 1, "오늘은 너무 더워요.", "It's so hot today.", "ɪts soʊ hɑːt təˈdeɪ", "今天太热了。", "jīntiān tài rè le", "今日はとても暑いです。", "きょうはとてもあついです");
  S("s-time05", "time", 2, "주말에 뭐 해요?", "What are you doing this weekend?", "wʌt ɑːr juː ˈduːɪŋ ðɪs ˌwiːkˈend", "周末你做什么？", "zhōumò nǐ zuò shénme", "週末は何をしますか？", "しゅうまつはなにをしますか");
  S("s-time06", "time", 1, "시간이 없어요.", "I don't have time.", "aɪ doʊnt hæv taɪm", "我没有时间。", "wǒ méiyǒu shíjiān", "時間がありません。", "じかんがありません");
  window.TL_SENTENCES = list;
})();
