<template>
    <div ref="editorContainer" style="width: 100%; height: 500px; border: 1px solid #ccc;"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as monaco from 'monaco-editor';
  
  // TypeScript를 위한 타입 정의 (선택 사항이지만 추천)
  let editor: monaco.editor.IStandaloneCodeEditor;
  
  // 에디터가 마운트될 DOM 요소를 참조하기 위한 ref
  const editorContainer = ref<HTMLElement | null>(null);
  
  // 컴포넌트가 화면에 마운트된 후 실행될 로직
  onMounted(() => {
    if (editorContainer.value) {
      editor = monaco.editor.create(editorContainer.value, {
        value: `function hello() {\n\talert('Hello, Vue + Monaco Editor!');\n}`,
        language: 'javascript',
        theme: 'vs-dark', // 테마: 'vs-dark', 'vs-light' 등
        automaticLayout: true, // 컨테이너 크기 변경 시 에디터 크기 자동 조절
      });
    }
  });
  
  // 컴포넌트가 파괴되기 전에 에디터 인스턴스 정리 (메모리 누수 방지)
  onBeforeUnmount(() => {
    if (editor) {
      editor.dispose();
    }
  });
  </script>