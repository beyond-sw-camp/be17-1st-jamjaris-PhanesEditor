<script setup lang="ts">
import CreateProjectPage from '@/components/CreateProjectPage.vue'
</script>
<template>
  <main>
  <div class="create">
    <CreateProjectPage />
  </div>
</main> 
</template>
<style scoped>
  /* 데스크탑 화면 (1024px 이상)에 대한 스타일 */
  @media (min-width: 1024px) {
    
    main {
      width: 100%;
    }

    .create {
      width: 100%;
      height: 1000px;
    }
  }

</style>