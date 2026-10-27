// ───────────────────────────────────────────────────────────────
// 저장소 설정
//   firebase 가 null 이면: 각 기기(브라우저)에만 기록이 저장됩니다. (설정 없이 바로 동작)
//   firebase 를 채우면: 가족 모두의 기록이 Firebase Firestore(무료 Spark 플랜)에 동기화됩니다.
//   설정 방법은 README.md 의 "가족 기록 동기화(Firebase) 설정" 참고.
// ───────────────────────────────────────────────────────────────
window.TL_CONFIG = {
  // 가족 공용 코드. 아무나 추측하기 어려운 긴 문자열로 바꾸세요. (이 코드가 곧 우리 가족 저장 공간의 주소)
  familyCode: "our-family-2026",

  // Firebase 콘솔 > 프로젝트 설정 > 내 앱 > SDK 설정에 나오는 firebaseConfig 객체를 그대로 붙여 넣으세요.
  firebase: null,
  // firebase: {
  //   apiKey: "AIza....",
  //   authDomain: "xxxx.firebaseapp.com",
  //   projectId: "xxxx",
  //   storageBucket: "xxxx.appspot.com",
  //   messagingSenderId: "1234567890",
  //   appId: "1:1234567890:web:abcdef",
  // },
};
