📜 팀 프로젝트 컨벤션 (Team Conventions)
원활한 협업과 코드 품질 유지를 위해 모든 팀원은 아래 컨벤션을 준수합니다.

1. Git 컨벤션
🌳 브랜치 전략: GitHub Flow
main: 항상 배포 가능한 상태를 유지하는 프로덕션 브랜치입니다. main 브랜치에 직접 커밋하는 것을 금지합니다.
feature/{기능이름}: 기능 개발 시 main에서 생성하는 브랜치입니다.
예시: feature/realtime-chat, feature/auth-jwt
개발 프로세스:
main 브랜치에서 새로운 기능 브랜치를 생성합니다.
기능 개발을 완료합니다.
main 브랜치로 **Pull Request (PR)**를 생성합니다.
**팀원 1명 이상의 코드 리뷰 및 승인(Approve)**을 받습니다.
PR을 main 브랜치에 병합(Merge)합니다.
💬 커밋 메시지: Conventional Commits
커밋 메시지는 정해진 양식에 따라 작성하여 변경 사항을 쉽게 파악할 수 있도록 합니다.
형식: 타입(스코프): 제목
스코프는 선택 사항이며, 변경된 파일의 위치나 도메인을 나타냅니다. (e.g., editor, auth, server)
주요 타입:
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정 (README.md 등)
style: 코드 포맷팅, 세미콜론 등 (코드 로직 변경 없음)
refactor: 코드 리팩토링
test: 테스트 코드 관련 작업
chore: 빌드, 패키지 매니저 설정 등 기타 잡일
커밋 메시지 예시:
feat(editor): 실시간 채팅 기능 추가
fix(auth): 소셜 로그인 시 리다이렉트 오류 수정
docs: API 명세서 업데이트
2. 코딩 스타일 컨벤션
☕ 백엔드 (Java / Spring Boot)
스타일 가이드: **Google Java Style Guide**를 따릅니다.
자동 포맷팅: IntelliJ 등 IDE의 Code Formatter 설정을 Google Style에 맞추고, 커밋 전 항상 포맷팅을 실행하여 코드 스타일을 통일합니다.
⚛️ 프론트엔드 (React / TypeScript)
핵심 도구: ESLint 와 Prettier 를 사용하여 코드 스타일을 강제하고 통일합니다.
ESLint: 문법 오류, 잠재적 버그, 코딩 스타일 위반을 찾아냅니다.
Prettier: 코드를 저장할 때마다 자동으로 포맷팅을 실행합니다.
설정: 프로젝트에 포함된 .eslintrc.js와 .prettierrc 설정을 모든 팀원이 공유하며, IDE에서 'Format on Save' 옵션을 활성화합니다.
3. API 설계 컨벤션
📡 REST API 엔드포인트
URL 네이밍: 리소스를 표현하는 복수형 명사를 사용합니다. (e.g., /api/projects, /api/projects/{projectId})
HTTP 메소드: 역할에 맞게 명확히 구분하여 사용합니다.
GET: 데이터 조회
POST: 데이터 생성
PUT: 데이터 전체 수정
PATCH: 데이터 일부 수정
DELETE: 데이터 삭제
📦 JSON 응답 형식 통일
모든 API 응답은 아래와 같은 일관된 구조로 감싸서 반환합니다.
성공 시:
JSON

{
  "success": true,
  "data": { 
    "projectId": 1, 
    "title": "My First Project",
    "participants": [] 
  },
  "error": null
}
실패 시:
JSON

{
  "success": false,
  "data": null,
  "error": {
    "code": "E404_PROJECT_NOT_FOUND",
    "message": "ID가 1인 프로젝트를 찾을 수 없습니다."
  }
}

