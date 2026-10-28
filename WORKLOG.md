# WORKLOG — 트라이링고

## 2026-10-28 · v0.1 최초 구축
- 요구사항: 영/중/일 3개 언어 동시 학습, 단어·문장 분리, 상황별·레벨별 분류, 노래로 배우기(유튜브+가사 해설), 테스트(범위별), 가족별 기록·레벨 시스템, 발음표기(병음·히라가나·가타카나·IPA) 토글, 모바일·PC 대응, GitHub Pages 배포.
- 중간 변경: 노래는 동요 대신 각 언어권 인기 가요로 교체(사용자 요청). 저작권 때문에 전체 가사 대신 핵심 구절 발췌 + 해설 + "내 가사 메모"(개인 저장) 구조로 설계.
- 기술 선택: 빌드 없는 정적 SPA(해시 라우팅). 데이터는 전역 JS 파일(file:// 로도 열림). 저장은 localStorage 기본 + Firebase Firestore 선택(config.js). 쓰기 디바운스·사용자당 1문서로 무료 한도 최적화.
- 콘텐츠: 단어 132(10개 상황, 레벨1 82/레벨2 33/레벨3 17), 문장 60, 노래 9곡(영: Die With A Smile, BIRDS OF A FEATHER, APT. / 일: Lemon, Pretender, アイドル / 중: 告白气球, 光年之外, 小幸运).
- 검증: node --check 전 파일 통과, id 중복 없음, 필수 필드 누락 없음, 로마자 변환 샘플 정상.
- 알려진 제약: 유튜브 ID 중 光年之外(KqVN10ICaE0)·小幸运(_sQSXwdtxlY)은 공식 채널 여부 미확인 → 재생 안 되면 data/songs.js의 yt 값만 교체. Firestore 보안은 가족 코드 기반(로그인 없음).
- 배포: https://github.com/Dorongyee/trilingo → https://dorongyee.github.io/trilingo/ (GitHub Pages, main 루트). 배포 주소에서 프로필 생성·노래 화면 유튜브 임베드(APT.) 재생 가능 확인. 9곡 영상 ID 모두 oEmbed 200 응답.
- 수정: header backdrop-filter 가 하단 고정 내비를 헤더 안에 가두는 버그 → 제거. html scroll-padding-bottom 추가.

## 2026-10-28 · v0.2 Firebase 가족 동기화
- Firebase 프로젝트 trilingo-2eaf8(사용자가 콘솔에서 생성; CLI 생성은 약관 미동의로 403), 웹 앱 trilingo-web 등록, Firestore (default) 생성, firestore.rules 배포(firebase deploy --only firestore:rules).
- js/config.js 에 firebaseConfig + familyCode 기입. 같은 이름으로 프로필 생성 시 기존 기록에 자동 연결(app.js).
- 수정 전 버전: backup/2026-10-28-v0.1/
- 검증(배포 주소, 독립 브라우저 세션 2개): A에서 "동기화테스트" 생성·단어 3개 학습 → Firestore 문서 생성(XP 15) 확인 → B 홈에 가족 목록 표시, 같은 이름으로 생성 시 같은 id(afjf74f8fh)·XP 15·학습 3개로 연결됨. 테스트 문서는 삭제. 콘솔의 Listen 채널 404/400은 WebChannel 재접속 노이즈(정상).
