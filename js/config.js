// ───────────────────────────────────────────────────────────────
// 저장소 설정
//   firebase 가 null 이면: 각 기기(브라우저)에만 기록이 저장됩니다.
//   firebase 를 채우면: 가족 모두의 기록이 Firebase Firestore(무료 Spark 플랜)에 동기화됩니다.
//   (웹용 firebaseConfig 는 공개되어도 되는 값입니다. 접근 제어는 firestore.rules + familyCode 로 합니다.)
// ───────────────────────────────────────────────────────────────
window.TL_CONFIG = {
  // 가족 공용 코드 = 우리 가족 저장 공간의 주소. 바꾸면 기존 기록이 안 보이니 그대로 두세요.
  familyCode: "fam-kdM_5udQQhCL",

  // Firebase 프로젝트 trilingo-2eaf8 / 웹 앱 trilingo-web (2026-10-28 생성)
  firebase: {
    apiKey: "AIzaSyBR5qPLuFA58QOOk2OUNRs7G5Qr-6042SQ",
    authDomain: "trilingo-2eaf8.firebaseapp.com",
    projectId: "trilingo-2eaf8",
    storageBucket: "trilingo-2eaf8.firebasestorage.app",
    messagingSenderId: "206011286656",
    appId: "1:206011286656:web:e2d3b7710d4fabeb059265",
  },
};
