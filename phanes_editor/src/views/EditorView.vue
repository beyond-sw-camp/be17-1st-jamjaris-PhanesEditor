<script setup lang="ts">
import CodeEditor from '@/components/CodeEditor.vue';
import DosChat from '@/components/DosChat.vue';
import TerminalWindow from '@/components/TerminalWindows.vue';
import HeTree from '@/components/TreeView.vue'
import '@he-tree/vue/style/default.css'

</script>

<template>
  <main>
    <div class="body_wrapper">
      <div class="tree_wrapper">
        <HeTree/>
      </div>  
      <CodeEditor />
      <div class="vertical_wrapper">
        <DosChat />
        <TerminalWindow />
      </div>
    </div>
  </main>
</template>

<style scoped>
  /* 데스크탑 화면 (1024px 이상)에 대한 스타일 */
  @media (min-width: 1024px) {
    
    main {
      width: 50%;
    }
    .tree_wrapper {
      display: inline-flex;
      min-width: 150px;
      max-width: 200px;
      background-color: #F0F0F0;
    }

    .body_wrapper {
      display: flex;
      flex-direction: row;
      min-width: 1000px;
      max-width: 2000px;
    }

    .vertical_wrapper {
      max-width: 600px;
    }

    .body_wrapper > :deep(*:nth-child(2)) {
      border-left: 1px solid var(--color-border);
    }
  }

</style>
