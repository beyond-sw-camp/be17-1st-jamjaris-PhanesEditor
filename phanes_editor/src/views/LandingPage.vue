<template>
  <div class="page-container">
    <button class="hamburger-btn" :class="{ open: isSidebarOpen }" @click="toggleSidebar" aria-label="사이드바 열기/닫기">
      ☰
    </button>

    <aside class="sidebar" :class="{ open: isSidebarOpen }">
      <div class="sidebar-content">
        <h3>Project Tree</h3>
        <p><em>(파일 탐색기 영역)</em></p>
        <p>- Phanes-Editor-Project/</p>
        <p>- Algorithm-Study/</p>
        <p>- My-Portfolio/</p>
      </div>
    </aside>

    <main class="main-content">
      <div class="search-section">
        <label for="search-box" class="prompt">&gt; </label>
        <input 
          type="text" 
          id="search-box"
          class="search-input" 
          v-model="searchQuery" 
          placeholder="검색할 프로젝트 이름을 입력하세요..."
        />
      </div>

      <div class="results-section">
        <ul class="project-list">
          <li v-for="project in filteredProjects" :key="project.id" class="project-item">
            <p>
              <span class="project-name">{{ project.name }}</span>
              <span class="project-lang">[{{ project.language }}]</span>
            </p>
            <p class="project-desc">{{ project.description }}</p>
            <p class="project-participants">참여자: {{ project.participants }}</p>
          </li>
        </ul>
        <div v-if="filteredProjects.length === 0 && searchQuery" class="no-results">
          '{{ searchQuery }}'에 대한 검색 결과가 없습니다.
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isSidebarOpen = ref(true);
const searchQuery = ref('');

const allProjects = ref([
  { id: 1, name: 'Phanes Editor 개발', description: '실시간 협업 에디터 메인 프로젝트', language: 'Vue.js', participants: 5 },
  { id: 2, name: '알고리즘 스터디', description: '백준 문제풀이 및 코드 리뷰', language: 'Python', participants: 3 },
  { id: 3, name: '개인 포트폴리오 사이트', description: 'Vue3와 TypeScript 기반', language: 'Vue.js', participants: 1 },
  { id: 4, name: '사이드 프로젝트: 게임 서버', description: 'Spring Boot와 WebSocket 활용', language: 'Java', participants: 4 },
  { id: 5, name: 'DB 구조 설계', description: 'Phanes Editor의 데이터베이스 모델링', language: 'SQL', participants: 2 },
]);

const filteredProjects = computed(() => {
  if (!searchQuery.value) {
    return allProjects.value;
  }
  return allProjects.value.filter(project => {
    const query = searchQuery.value.toLowerCase();
    return (
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
  });
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

</script>

<style scoped>
/* ★★★★★ 여기가 핵심: 전체 테마 및 버튼 위치 수정 ★★★★★ */
.page-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: #f8f5f2; /* 부드러운 베이지/오프화이트 배경 */
  color: #333333; /* 기본 글자색을 어둡게 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; /* 가독성 좋은 기본 폰트 */
  overflow: hidden;
}

/* 햄버거 버튼 */
.hamburger-btn {
  position: fixed;
  top: 15px;
  left: 15px; /* 기본 위치 */
  z-index: 1001;
  background: none;
  border: none;
  color: #333; /* 어두운 아이콘 색상 */
  font-size: 24px;
  cursor: pointer;
  transition: left 0.3s ease-in-out; /* left 속성 애니메이션 */
}

/* 사이드바가 열렸을 때 햄버거 버튼의 위치 */
.hamburger-btn.open {
  left: 295px; /* 사이드바 너비(280px) + 여백(15px) */
}

/* 사이드바 스타일 */
.sidebar {
  width: 280px;
  flex-shrink: 0;
  background-color: #ffffff; /* 흰색 배경 */
  border-right: 1px solid #e5e5e5; /* 연한 회색 테두리 */
  padding: 20px;
  padding-top: 60px;
  transition: margin-left 0.3s ease-in-out;
  margin-left: 0;
}

.sidebar:not(.open) {
  margin-left: -280px;
}

.sidebar-content h3 {
  color: #0056b3; /* 포인트 컬러 (파란색 계열) */
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;
}

.sidebar-content p {
    color: #555;
}

/* 메인 콘텐츠 영역 */
.main-content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-section {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
  flex-shrink: 0;
  border-radius: 8px;
}

.prompt {
  font-size: 1.2rem;
  color: #0056b3;
  margin-right: 10px;
}

.search-input {
  width: 100%;
  background: none;
  border: none;
  color: #333;
  font-family: inherit;
  font-size: 1.2rem;
}
.search-input:focus {
  outline: none;
}

/* 검색 결과 영역 */
.results-section {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.project-list { list-style-type: none; padding: 0; margin: 0; }
.project-item { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
.project-item:last-child { border-bottom: none; }
.project-item p { margin: 8px 0; }
.project-name { font-size: 1.2rem; color: #0056b3; font-weight: 600; }
.project-lang { margin-left: 10px; background-color: #e9ecef; color: #495057; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
.project-desc { color: #555; }
.project-participants { font-size: 0.9rem; color: #888; }
.no-results { color: #888; }
</style>