<template>
    <div class="terminal-container" ref="terminalContainerRef"></div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import { Terminal } from 'xterm';
  import { FitAddon } from 'xterm-addon-fit';
  import 'xterm/css/xterm.css'; // xterm의 기본 CSS를 임포트
  
  // DOM 요소와 터미널 인스턴스를 담을 변수
  const terminalContainerRef = ref(null);
  let term;
  let fitAddon;
  
  // 컴포넌트가 화면에 마운트된 후 실행
  onMounted(() => {
    if (terminalContainerRef.value) {
      // 터미널 인스턴스 생성
      term = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: "'Courier New', Courier, monospace",
        theme: {
          background: '#1e1e1e',
          foreground: '#d4d4d4',
          cursor: '#d4d4d4',
        },
        convertEol: true,
      });
  
      // Fit 애드온 로드
      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
  
      // 터미널을 DOM에 부착
      term.open(terminalContainerRef.value);
  
      // 컨테이너 크기에 맞게 터미널 리사이즈
      fitAddon.fit();
  
      // 초기 메시지 출력
      term.write('Phanes Editor Execution Terminal\r\n');
      term.write('$ ');
    }
  });
  
  // 컴포넌트가 파괴되기 전 리소스 정리 (메모리 누수 방지)
  onBeforeUnmount(() => {
    if (term) {
      term.dispose();
    }
  });
  
  // 부모 컴포넌트에서 이 함수를 호출하여 터미널에 텍스트를 쓸 수 있도록 노출
  function writeOutput(data) {
    if (term) {
      const formattedData = data.replace(/\n/g, '\r\n');
      term.write(formattedData);
      term.write('\r\n$ ');
    }
  }
  
  defineExpose({
    writeOutput,
  });
  </script>
  
  <style scoped>
  .terminal-container {
    min-height: 282px;
    width: 100%;
    height: 45%;
    padding: 10px;
    background-color: #1e1e1e;
  }
  </style>