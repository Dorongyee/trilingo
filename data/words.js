// 단어 데이터. 형식: W(id, 상황, 레벨, 한국어, 영어, IPA, 중국어, 병음, 일본어, 요미(히라가나))
// id는 절대 바꾸지 마세요(학습 기록이 id 기준으로 저장됩니다). 새 단어는 새로운 id로 뒤에 추가하세요.
window.TL_SITUATIONS = [
  { key: "greet",   name: "인사·기본",      icon: "👋" },
  { key: "travel",  name: "공항·여행",      icon: "✈️" },
  { key: "food",    name: "식당·음식",      icon: "🍜" },
  { key: "shop",    name: "쇼핑",           icon: "🛍️" },
  { key: "hotel",   name: "숙박",           icon: "🏨" },
  { key: "transit", name: "교통·길찾기",    icon: "🚇" },
  { key: "health",  name: "병원·긴급",      icon: "🏥" },
  { key: "work",    name: "직장·비즈니스",  icon: "💼" },
  { key: "home",    name: "가족·집",        icon: "🏠" },
  { key: "time",    name: "시간·날씨",      icon: "⏰" },
];
window.TL_LEVELS = [
  { key: 1, name: "레벨 1 · 입문", desc: "가장 기본적인 생존 표현" },
  { key: 2, name: "레벨 2 · 초급", desc: "여행과 일상에서 자주 쓰는 표현" },
  { key: 3, name: "레벨 3 · 중급", desc: "조금 더 구체적이고 상황 대응이 필요한 표현" },
];
(function () {
  const list = [];
  function W(id, sit, lv, ko, en, ipa, zh, py, ja, yomi) {
    list.push({ id, type: "word", sit, lv, ko, en, ipa, zh, py, ja, yomi });
  }
  // ── 인사·기본
  W("greet01", "greet", 1, "안녕하세요", "Hello", "həˈloʊ", "你好", "nǐ hǎo", "こんにちは", "こんにちは");
  W("greet02", "greet", 1, "감사합니다", "Thank you", "ˈθæŋk juː", "谢谢", "xièxie", "ありがとう", "ありがとう");
  W("greet03", "greet", 1, "죄송합니다", "Sorry", "ˈsɑːri", "对不起", "duìbuqǐ", "すみません", "すみません");
  W("greet04", "greet", 1, "네", "Yes", "jes", "是", "shì", "はい", "はい");
  W("greet05", "greet", 1, "아니요", "No", "noʊ", "不是", "bú shì", "いいえ", "いいえ");
  W("greet06", "greet", 1, "안녕히 가세요", "Goodbye", "ˌɡʊdˈbaɪ", "再见", "zàijiàn", "さようなら", "さようなら");
  W("greet07", "greet", 2, "실례합니다", "Excuse me", "ɪkˈskjuːz miː", "请问", "qǐngwèn", "失礼します", "しつれいします");
  W("greet08", "greet", 2, "천만에요", "You're welcome", "jʊr ˈwelkəm", "不客气", "bú kèqi", "どういたしまして", "どういたしまして");
  W("greet09", "greet", 1, "이름", "Name", "neɪm", "名字", "míngzi", "名前", "なまえ");
  W("greet10", "greet", 1, "친구", "Friend", "frend", "朋友", "péngyou", "友達", "ともだち");
  W("greet11", "greet", 2, "환영합니다", "Welcome", "ˈwelkəm", "欢迎", "huānyíng", "ようこそ", "ようこそ");
  W("greet12", "greet", 1, "부탁합니다", "Please", "pliːz", "请", "qǐng", "お願いします", "おねがいします");
  W("greet13", "greet", 2, "소개", "Introduction", "ˌɪntrəˈdʌkʃn", "介绍", "jièshào", "紹介", "しょうかい");
  // ── 공항·여행
  W("travel01", "travel", 1, "공항", "Airport", "ˈerpɔːrt", "机场", "jīchǎng", "空港", "くうこう");
  W("travel02", "travel", 1, "여권", "Passport", "ˈpæspɔːrt", "护照", "hùzhào", "パスポート", "ぱすぽーと");
  W("travel03", "travel", 1, "비행기", "Airplane", "ˈerpleɪn", "飞机", "fēijī", "飛行機", "ひこうき");
  W("travel04", "travel", 2, "탑승권", "Boarding pass", "ˈbɔːrdɪŋ pæs", "登机牌", "dēngjīpái", "搭乗券", "とうじょうけん");
  W("travel05", "travel", 1, "짐(수하물)", "Luggage", "ˈlʌɡɪdʒ", "行李", "xíngli", "荷物", "にもつ");
  W("travel06", "travel", 3, "입국 심사", "Immigration", "ˌɪmɪˈɡreɪʃn", "入境检查", "rùjìng jiǎnchá", "入国審査", "にゅうこくしんさ");
  W("travel07", "travel", 2, "환전", "Currency exchange", "ˈkɜːrənsi ɪksˈtʃeɪndʒ", "换钱", "huànqián", "両替", "りょうがえ");
  W("travel08", "travel", 1, "지도", "Map", "mæp", "地图", "dìtú", "地図", "ちず");
  W("travel09", "travel", 2, "관광", "Sightseeing", "ˈsaɪtsiːɪŋ", "观光", "guānguāng", "観光", "かんこう");
  W("travel10", "travel", 1, "예약", "Reservation", "ˌrezərˈveɪʃn", "预订", "yùdìng", "予約", "よやく");
  W("travel11", "travel", 3, "세관", "Customs", "ˈkʌstəmz", "海关", "hǎiguān", "税関", "ぜいかん");
  W("travel12", "travel", 2, "탑승구", "Gate", "ɡeɪt", "登机口", "dēngjīkǒu", "搭乗口", "とうじょうぐち");
  W("travel13", "travel", 3, "연착", "Delay", "dɪˈleɪ", "延误", "yánwù", "遅延", "ちえん");
  W("travel14", "travel", 3, "경유", "Layover", "ˈleɪoʊvər", "中转", "zhōngzhuǎn", "乗り継ぎ", "のりつぎ");
  // ── 식당·음식
  W("food01", "food", 1, "식당", "Restaurant", "ˈrestrɑːnt", "餐厅", "cāntīng", "レストラン", "れすとらん");
  W("food02", "food", 1, "메뉴", "Menu", "ˈmenjuː", "菜单", "càidān", "メニュー", "めにゅー");
  W("food03", "food", 1, "물", "Water", "ˈwɔːtər", "水", "shuǐ", "水", "みず");
  W("food04", "food", 1, "밥", "Rice", "raɪs", "米饭", "mǐfàn", "ご飯", "ごはん");
  W("food05", "food", 1, "고기", "Meat", "miːt", "肉", "ròu", "肉", "にく");
  W("food06", "food", 1, "채소", "Vegetables", "ˈvedʒtəblz", "蔬菜", "shūcài", "野菜", "やさい");
  W("food07", "food", 1, "맛있다", "Delicious", "dɪˈlɪʃəs", "好吃", "hǎochī", "美味しい", "おいしい");
  W("food08", "food", 2, "계산서", "Bill", "bɪl", "账单", "zhàngdān", "お会計", "おかいけい");
  W("food09", "food", 1, "맵다", "Spicy", "ˈspaɪsi", "辣", "là", "辛い", "からい");
  W("food10", "food", 1, "젓가락", "Chopsticks", "ˈtʃɑːpstɪks", "筷子", "kuàizi", "箸", "はし");
  W("food11", "food", 2, "추천", "Recommendation", "ˌrekəmenˈdeɪʃn", "推荐", "tuījiàn", "おすすめ", "おすすめ");
  W("food12", "food", 2, "알레르기", "Allergy", "ˈælərdʒi", "过敏", "guòmǐn", "アレルギー", "あれるぎー");
  W("food13", "food", 2, "포장(테이크아웃)", "Takeout", "ˈteɪkaʊt", "打包", "dǎbāo", "持ち帰り", "もちかえり");
  // ── 쇼핑
  W("shop01", "shop", 1, "가격", "Price", "praɪs", "价格", "jiàgé", "値段", "ねだん");
  W("shop02", "shop", 1, "싸다", "Cheap", "tʃiːp", "便宜", "piányi", "安い", "やすい");
  W("shop03", "shop", 1, "비싸다", "Expensive", "ɪkˈspensɪv", "贵", "guì", "高い", "たかい");
  W("shop04", "shop", 2, "할인", "Discount", "ˈdɪskaʊnt", "打折", "dǎzhé", "割引", "わりびき");
  W("shop05", "shop", 1, "현금", "Cash", "kæʃ", "现金", "xiànjīn", "現金", "げんきん");
  W("shop06", "shop", 1, "신용카드", "Credit card", "ˈkredɪt kɑːrd", "信用卡", "xìnyòngkǎ", "クレジットカード", "くれじっとかーど");
  W("shop07", "shop", 2, "영수증", "Receipt", "rɪˈsiːt", "收据", "shōujù", "レシート", "れしーと");
  W("shop08", "shop", 1, "사이즈", "Size", "saɪz", "尺码", "chǐmǎ", "サイズ", "さいず");
  W("shop09", "shop", 1, "색깔", "Color", "ˈkʌlər", "颜色", "yánsè", "色", "いろ");
  W("shop10", "shop", 3, "환불", "Refund", "ˈriːfʌnd", "退款", "tuìkuǎn", "返金", "へんきん");
  W("shop11", "shop", 2, "교환", "Exchange", "ɪksˈtʃeɪndʒ", "换货", "huànhuò", "交換", "こうかん");
  W("shop12", "shop", 1, "선물", "Gift", "ɡɪft", "礼物", "lǐwù", "プレゼント", "ぷれぜんと");
  W("shop13", "shop", 3, "품절", "Sold out", "soʊld aʊt", "卖完了", "màiwán le", "売り切れ", "うりきれ");
  // ── 숙박
  W("hotel01", "hotel", 1, "호텔", "Hotel", "hoʊˈtel", "酒店", "jiǔdiàn", "ホテル", "ほてる");
  W("hotel02", "hotel", 1, "방", "Room", "ruːm", "房间", "fángjiān", "部屋", "へや");
  W("hotel03", "hotel", 1, "체크인", "Check-in", "ˈtʃek ɪn", "入住", "rùzhù", "チェックイン", "ちぇっくいん");
  W("hotel04", "hotel", 1, "체크아웃", "Check-out", "ˈtʃek aʊt", "退房", "tuìfáng", "チェックアウト", "ちぇっくあうと");
  W("hotel05", "hotel", 1, "열쇠", "Key", "kiː", "钥匙", "yàoshi", "鍵", "かぎ");
  W("hotel06", "hotel", 1, "침대", "Bed", "bed", "床", "chuáng", "ベッド", "べっど");
  W("hotel07", "hotel", 1, "수건", "Towel", "ˈtaʊəl", "毛巾", "máojīn", "タオル", "たおる");
  W("hotel08", "hotel", 1, "아침 식사", "Breakfast", "ˈbrekfəst", "早餐", "zǎocān", "朝食", "ちょうしょく");
  W("hotel09", "hotel", 1, "와이파이", "Wi-Fi", "ˈwaɪfaɪ", "无线网络", "wúxiàn wǎngluò", "Wi-Fi", "わいふぁい");
  W("hotel10", "hotel", 2, "에어컨", "Air conditioner", "ˈer kənˌdɪʃənər", "空调", "kōngtiáo", "エアコン", "えあこん");
  W("hotel11", "hotel", 2, "프런트", "Front desk", "frʌnt desk", "前台", "qiántái", "フロント", "ふろんと");
  W("hotel12", "hotel", 2, "확인", "Confirmation", "ˌkɑːnfərˈmeɪʃn", "确认", "quèrèn", "確認", "かくにん");
  W("hotel13", "hotel", 3, "보증금", "Deposit", "dɪˈpɑːzɪt", "押金", "yājīn", "保証金", "ほしょうきん");
  // ── 교통·길찾기
  W("transit01", "transit", 1, "역", "Station", "ˈsteɪʃn", "车站", "chēzhàn", "駅", "えき");
  W("transit02", "transit", 1, "지하철", "Subway", "ˈsʌbweɪ", "地铁", "dìtiě", "地下鉄", "ちかてつ");
  W("transit03", "transit", 1, "버스", "Bus", "bʌs", "公交车", "gōngjiāochē", "バス", "ばす");
  W("transit04", "transit", 1, "택시", "Taxi", "ˈtæksi", "出租车", "chūzūchē", "タクシー", "たくしー");
  W("transit05", "transit", 1, "표(티켓)", "Ticket", "ˈtɪkɪt", "票", "piào", "切符", "きっぷ");
  W("transit06", "transit", 1, "왼쪽", "Left", "left", "左边", "zuǒbian", "左", "ひだり");
  W("transit07", "transit", 1, "오른쪽", "Right", "raɪt", "右边", "yòubian", "右", "みぎ");
  W("transit08", "transit", 2, "직진", "Straight", "streɪt", "直走", "zhízǒu", "直進", "ちょくしん");
  W("transit09", "transit", 1, "출구", "Exit", "ˈeɡzɪt", "出口", "chūkǒu", "出口", "でぐち");
  W("transit10", "transit", 2, "환승", "Transfer", "ˈtrænsfɜːr", "换乘", "huànchéng", "乗り換え", "のりかえ");
  W("transit11", "transit", 2, "교통카드", "Transit card", "ˈtrænzɪt kɑːrd", "交通卡", "jiāotōngkǎ", "交通カード", "こうつうかーど");
  W("transit12", "transit", 3, "막차", "Last train", "læst treɪn", "末班车", "mòbānchē", "終電", "しゅうでん");
  W("transit13", "transit", 3, "교통 체증", "Traffic jam", "ˈtræfɪk dʒæm", "堵车", "dǔchē", "渋滞", "じゅうたい");
  // ── 병원·긴급
  W("health01", "health", 1, "병원", "Hospital", "ˈhɑːspɪtl", "医院", "yīyuàn", "病院", "びょういん");
  W("health02", "health", 2, "약국", "Pharmacy", "ˈfɑːrməsi", "药店", "yàodiàn", "薬局", "やっきょく");
  W("health03", "health", 1, "아프다", "Hurt", "hɜːrt", "疼", "téng", "痛い", "いたい");
  W("health04", "health", 1, "열", "Fever", "ˈfiːvər", "发烧", "fāshāo", "熱", "ねつ");
  W("health05", "health", 1, "감기", "Cold (illness)", "koʊld", "感冒", "gǎnmào", "風邪", "かぜ");
  W("health06", "health", 1, "약", "Medicine", "ˈmedɪsn", "药", "yào", "薬", "くすり");
  W("health07", "health", 1, "의사", "Doctor", "ˈdɑːktər", "医生", "yīshēng", "医者", "いしゃ");
  W("health08", "health", 1, "머리", "Head", "hed", "头", "tóu", "頭", "あたま");
  W("health09", "health", 1, "배(복부)", "Stomach", "ˈstʌmək", "肚子", "dùzi", "お腹", "おなか");
  W("health10", "health", 2, "구급차", "Ambulance", "ˈæmbjələns", "救护车", "jiùhùchē", "救急車", "きゅうきゅうしゃ");
  W("health11", "health", 1, "경찰", "Police", "pəˈliːs", "警察", "jǐngchá", "警察", "けいさつ");
  W("health12", "health", 3, "보험", "Insurance", "ɪnˈʃʊrəns", "保险", "bǎoxiǎn", "保険", "ほけん");
  W("health13", "health", 3, "증상", "Symptom", "ˈsɪmptəm", "症状", "zhèngzhuàng", "症状", "しょうじょう");
  W("health14", "health", 3, "처방전", "Prescription", "prɪˈskrɪpʃn", "处方", "chǔfāng", "処方箋", "しょほうせん");
  // ── 직장·비즈니스
  W("work01", "work", 1, "회사", "Company", "ˈkʌmpəni", "公司", "gōngsī", "会社", "かいしゃ");
  W("work02", "work", 1, "회의", "Meeting", "ˈmiːtɪŋ", "会议", "huìyì", "会議", "かいぎ");
  W("work03", "work", 1, "이메일", "Email", "ˈiːmeɪl", "电子邮件", "diànzǐ yóujiàn", "メール", "めーる");
  W("work04", "work", 2, "명함", "Business card", "ˈbɪznəs kɑːrd", "名片", "míngpiàn", "名刺", "めいし");
  W("work05", "work", 3, "계약", "Contract", "ˈkɑːntrækt", "合同", "hétong", "契約", "けいやく");
  W("work06", "work", 2, "마감", "Deadline", "ˈdedlaɪn", "截止日期", "jiézhǐ rìqī", "締め切り", "しめきり");
  W("work07", "work", 2, "상사", "Boss", "bɔːs", "老板", "lǎobǎn", "上司", "じょうし");
  W("work08", "work", 2, "동료", "Colleague", "ˈkɑːliːɡ", "同事", "tóngshì", "同僚", "どうりょう");
  W("work09", "work", 2, "보고서", "Report", "rɪˈpɔːrt", "报告", "bàogào", "報告書", "ほうこくしょ");
  W("work10", "work", 2, "출근", "Going to work", "ˈɡoʊɪŋ tə wɜːrk", "上班", "shàngbān", "出勤", "しゅっきん");
  W("work11", "work", 2, "퇴근", "Leaving work", "ˈliːvɪŋ wɜːrk", "下班", "xiàbān", "退勤", "たいきん");
  W("work12", "work", 3, "해운", "Shipping", "ˈʃɪpɪŋ", "海运", "hǎiyùn", "海運", "かいうん");
  W("work13", "work", 3, "협상", "Negotiation", "nɪˌɡoʊʃiˈeɪʃn", "谈判", "tánpàn", "交渉", "こうしょう");
  // ── 가족·집
  W("home01", "home", 1, "가족", "Family", "ˈfæməli", "家人", "jiārén", "家族", "かぞく");
  W("home02", "home", 1, "아버지", "Father", "ˈfɑːðər", "爸爸", "bàba", "父", "ちち");
  W("home03", "home", 1, "어머니", "Mother", "ˈmʌðər", "妈妈", "māma", "母", "はは");
  W("home04", "home", 1, "아이", "Child", "tʃaɪld", "孩子", "háizi", "子供", "こども");
  W("home05", "home", 1, "집", "House", "haʊs", "家", "jiā", "家", "いえ");
  W("home06", "home", 2, "부엌", "Kitchen", "ˈkɪtʃɪn", "厨房", "chúfáng", "台所", "だいどころ");
  W("home07", "home", 1, "화장실", "Bathroom", "ˈbæθruːm", "洗手间", "xǐshǒujiān", "トイレ", "といれ");
  W("home08", "home", 1, "창문", "Window", "ˈwɪndoʊ", "窗户", "chuānghu", "窓", "まど");
  W("home09", "home", 1, "문", "Door", "dɔːr", "门", "mén", "ドア", "どあ");
  W("home10", "home", 2, "청소", "Cleaning", "ˈkliːnɪŋ", "打扫", "dǎsǎo", "掃除", "そうじ");
  W("home11", "home", 1, "요리", "Cooking", "ˈkʊkɪŋ", "做饭", "zuòfàn", "料理", "りょうり");
  W("home12", "home", 2, "반려동물", "Pet", "pet", "宠物", "chǒngwù", "ペット", "ぺっと");
  W("home13", "home", 3, "이웃", "Neighbor", "ˈneɪbər", "邻居", "línjū", "隣人", "りんじん");
  // ── 시간·날씨
  W("time01", "time", 1, "오늘", "Today", "təˈdeɪ", "今天", "jīntiān", "今日", "きょう");
  W("time02", "time", 1, "내일", "Tomorrow", "təˈmɑːroʊ", "明天", "míngtiān", "明日", "あした");
  W("time03", "time", 1, "어제", "Yesterday", "ˈjestərdeɪ", "昨天", "zuótiān", "昨日", "きのう");
  W("time04", "time", 1, "지금", "Now", "naʊ", "现在", "xiànzài", "今", "いま");
  W("time05", "time", 1, "시간", "Time", "taɪm", "时间", "shíjiān", "時間", "じかん");
  W("time06", "time", 1, "주말", "Weekend", "ˌwiːkˈend", "周末", "zhōumò", "週末", "しゅうまつ");
  W("time07", "time", 1, "날씨", "Weather", "ˈweðər", "天气", "tiānqì", "天気", "てんき");
  W("time08", "time", 1, "비", "Rain", "reɪn", "雨", "yǔ", "雨", "あめ");
  W("time09", "time", 1, "덥다", "Hot", "hɑːt", "热", "rè", "暑い", "あつい");
  W("time10", "time", 1, "춥다", "Cold (weather)", "koʊld", "冷", "lěng", "寒い", "さむい");
  W("time11", "time", 1, "아침", "Morning", "ˈmɔːrnɪŋ", "早上", "zǎoshang", "朝", "あさ");
  W("time12", "time", 1, "저녁(밤)", "Evening", "ˈiːvnɪŋ", "晚上", "wǎnshang", "夜", "よる");
  W("time13", "time", 3, "습도", "Humidity", "hjuːˈmɪdəti", "湿度", "shīdù", "湿度", "しつど");
  window.TL_WORDS = list;
})();
