<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">File</RouterLink>
        <RouterLink to="/create">Editor</RouterLink>
        <RouterLink to="/signup">SignUp</RouterLink>
      </nav>
    </div>
  </header>
  <main>
      <RouterView />
  </main>
</template>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* 데스크탑 화면 (1024px 이상)에 대한 스타일 */
@media (min-width: 1024px) {
  #app {
    display: flex;
    max-width: 100vw;
    margin: 0;
    padding: 0;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    width: 250px;
    flex-shrink: 0;
  }
  
  nav {
    display: flex;
    flex-direction: row; 
    text-align: left;
    font-size: 1rem;
    width: 100%;
  }

  main {
    width: 100%;
  }
}
</style>