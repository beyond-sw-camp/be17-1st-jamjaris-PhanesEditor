<template>
    <div class="signup-container">
      <div class="form-wrapper">
        
        <div v-if="step === 'select_provider'">
          <h1 class="title">회원가입</h1>
          <p class="subtitle">사용하시는 소셜 계정으로<br>간편하게 시작해보세요.</p>
          <div class="social-login-buttons">
            <button class="social-btn google" @click="handleSocialLogin('google')">
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.37,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
              <span>구글로 시작하기</span>
            </button>
            <button class="social-btn kakao" @click="handleSocialLogin('kakao')">
               <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.82 0 3.53-.49 5-1.35 0 0 0 0 0 0-1.28-.6-2.28-1.83-2.5-3.32-.02-.15-.03-.3-.03-.45 0-2.42 1.95-4.38 4.38-4.38.35 0 .69.04 1.02.12C20.49 11.47 21 9.82 21 8c0-3.31-2.69-6-6-6-3.31 0-6 2.69-6 6 0 .82.16 1.59.45 2.28-.27 1.49-1.27 2.72-2.55 3.32C6.53 21.51 9.82 22 12 22c5.52 0 10-4.48 10-10 0-.82-.16-1.59-.45-2.28.27-1.49 1.27-2.72 2.55-3.32C21.47 6.49 18.18 6 16 6c-3.31 0-6 2.69-6 6z" fill="#3C1E1E"/></svg>
              <span>카카오로 시작하기</span>
            </button>
          </div>
        </div>
  
        <div v-else-if="step === 'set_nickname'">
          <h1 class="title">닉네임 설정</h1>
          <p class="subtitle"><strong class="highlight">{{ socialUser.email }}</strong> 계정으로 가입합니다.<br>서비스에서 사용할 닉네임을 입력해주세요.</p>
          
          <div class="form-group floating-label" :class="{ 'is-valid': isNicknameValid }">
            <input type="text" id="nickname" v-model.trim="nickname" placeholder=" " @keydown.enter.prevent="completeSignUp" />
            <label for="nickname">닉네임 (2자 이상)</label>
          </div>
  
          <button @click="completeSignUp" :disabled="!isNicknameValid" class="submit-btn">가입 완료하기</button>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue';
  
  // 'select_provider' (소셜 로그인 선택) 또는 'set_nickname' (닉네임 설정)
  const step = ref('select_provider'); 
  
  // 소셜 로그인 성공 시 임시로 유저 정보를 담을 객체
  const socialUser = reactive({
    email: '',
    provider: '',
  });
  
  const nickname = ref('');
  // 닉네임이 2자 이상일 때만 유효하다고 판단
  const isNicknameValid = computed(() => nickname.value.trim().length >= 2);
  
  // 실제로는 백엔드와 연동하여 소셜 로그인 창을 띄우고,
  // 성공 시 콜백을 받아 이메일 등의 정보를 socialUser에 저장해야 합니다.
  function handleSocialLogin(provider) {
    console.log(`${provider} 소셜 로그인 시작...`);
    
    // --- 여기는 데모를 위한 가짜 로직입니다 ---
    // 실제 구현 시, 이 부분은 서버와 통신 후 리다이렉트 되는 로직으로 대체됩니다.
    setTimeout(() => {
      socialUser.email = provider === 'google' ? 'user@gmail.com' : 'user@kakao.com';
      socialUser.provider = provider;
      step.value = 'set_nickname'; // 닉네임 설정 단계로 전환
    }, 500);
    // --- 여기까지 가짜 로직 ---
  }
  
  function completeSignUp() {
    if (!isNicknameValid.value) {
      alert('닉네임을 2자 이상 입력해주세요.');
      return;
    }
    
    // 실제로는 이 정보를 백엔드 서버로 보내 최종 회원가입을 처리합니다.
    const finalUserData = {
      ...socialUser,
      nickname: nickname.value,
    };
    
    console.log('최종 회원가입 정보:', JSON.stringify(finalUserData, null, 2));
    alert(`'${nickname.value}'님, 회원가입이 완료되었습니다!`);
    
    // 성공 시, 메인 페이지나 대시보드로 이동하는 로직 추가
    // router.push('/');
  }
  </script>
  
  <style scoped>
  .signup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    background-color: #f4f5f7;
    min-height: 100vh;
  }
  .form-wrapper {
    width: 100%;
    max-width: 480px;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .title { font-size: 2rem; font-weight: bold; text-align: center; margin-bottom: 10px; }
  .subtitle { font-size: 1rem; color: #6b7280; text-align: center; margin-bottom: 40px; line-height: 1.6; }
  .subtitle .highlight {
    color: #4f46e5;
    font-weight: bold;
  }
  
  /* --- 소셜 로그인 버튼 스타일 --- */
  .social-login-buttons { display: flex; flex-direction: column; gap: 15px; }
  .social-btn { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
  .social-btn .icon { margin-right: 12px; }
  .social-btn.google { background-color: #ffffff; color: #374151; }
  .social-btn.google:hover { background-color: #f9fafb; }
  .social-btn.kakao { background-color: #FEE500; color: #3C1E1E; border-color: #FEE500; }
  .social-btn.kakao:hover { background-color: #fddc00; }
  
  /* --- 플로팅 라벨 및 입력창 스타일 --- */
  .form-group { text-align: left; margin-bottom: 24px; }
  .form-group.floating-label { position: relative; margin-top: 20px; }
  div.form-group.floating-label > label { position: absolute; top: 13px; left: 13px; color: #9ca3af; pointer-events: none; transform-origin: top left; transition: all 0.2s ease-out; background-color: transparent; padding: 0 5px; }
  div.form-group.floating-label > input:focus + label,
  div.form-group.floating-label > input:not(:placeholder-shown) + label { transform: translateY(-24px) scale(0.85); color: #4f46e5; background-color: white; }
  input[type="text"] { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 1rem; box-sizing: border-box; }
  input[type="text"]:focus { outline: none; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2); }
  
  @keyframes glowing-border { 0% { box-shadow: 0 0 3px rgba(79, 70, 229, 0.3); } 50% { box-shadow: 0 0 8px 3px rgba(79, 70, 229, 0.5); } 100% { box-shadow: 0 0 3px rgba(79, 70, 229, 0.3); } }
  .form-group.is-valid input { border-color: #4f46e5; animation: glowing-border 1.5s infinite; }
  
  /* 가입 완료 버튼 */
  .submit-btn { width: 100%; padding: 15px; background-color: #4f46e5; color: white; border: none; border-radius: 6px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; margin-top: 10px; }
  .submit-btn:disabled { background-color: #a5b4fc; cursor: not-allowed; }
  .submit-btn:hover:not(:disabled) { background-color: #4338ca; }
  </style>