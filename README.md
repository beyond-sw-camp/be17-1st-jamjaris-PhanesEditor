# Phanes Editor
<p align="middle" style="margin: 0; padding: 0;">
  <!-- <img width="200px" src="./assets/image/5ven icon.png"> -->
</p>

<p align="middle">
<h1>한화시스템 BEYOND SW캠프</h1>
<br>팀 잠자리들
</p>

## 팀원 소개

<figure>
    <table>
      <tr>
        <td align="center"><img src="./img/샌드위치.png" width="180px"/></td>
        <td align="center"><img src="./img/식빵.png" width="180px"/></td>
        <td align="center"><img src="./img/반죽.png" width="180px"/></td>
      	<td align="center"><img src="./img/밀가루.png" width="180px"/></td>
      </tr>
      <tr>
        <td align="center">팀원: <a href="https://github.com/why48382">이현식</a></td>
        <td align="center">팀원: <a href=#>염준선</a></td>
        <td align="center">팀원: <a href="https://github.com/flcat" >권재찬</a></td>
        <td align="center">팀원: <a href="https://github.com/Jumil1">임주식</a></td>
      </tr>
    </table>
</figure>


## 프로젝트 소개

> 'Phanes Editor'는 별도의 프로그램 설치 없이 웹 브라우저만으로 실시간 코드 공유 및 동시 편집이 가능한 웹 기반 페어 프로그래밍 서비스입니다.



## 🎞 프로젝트 기획서
[프로젝트 기획서](./assets/프로젝트 기획서.pdf)


## 요구사항 정의서 
[요구사항 정의서](https://github.com/beyond-sw-camp/be17-1st-jamjaris-PhanesEditor/blob/main/img/%EC%A0%95%EC%9D%98%EC%84%9C1.png)
[요구사항 정의서](https://github.com/beyond-sw-camp/be17-1st-jamjaris-PhanesEditor/blob/main/img/%EC%A0%95%EC%9D%98%EC%84%9C2.png)
[요구사항 정의서](https://github.com/beyond-sw-camp/be17-1st-jamjaris-PhanesEditor/blob/main/img/%EC%A0%95%EC%9D%98%EC%84%9C3.png)

<br>

## ERD
![ERD](./img/%EC%84%A4%EA%B3%84%20ERD.png)
<br>

## 🔀 시스템 아키텍처
![시스템 아키텍처](./img/DB%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)
<br>
### 설계 의도
- DB 클러스터 (Active-Active)
  - 코드 작성, 채팅기능 등 쓰기 작업이 많아 여려대의 쓰기 서버 구성
  - 한 서버 노드가 다운되더라도 다른 노드가 서비스를 계속 제공하여 가용성이 높다.
  - 사용자가 증가해도 서버 확장성이 좋아 용이

- HAProxy
    - DB 클러스터의 읽기 작업 분산
<!-- ### DR(재난 복구) 시나리오
<details>
<summary>DB 클러스터</summary>
<div markdown="1">

- 1대 장애 시
  - HAProxy에서 wsrep_local_state 값을 확인하여 장애 확인하고 해당 노드 차단
  - 노드 복구 후 MySQL을 다시 실행하여 클러스터에 재참여
  - 복구된 노드는 클러스터로 자동 동기화 됨
  - 이후 HAProxy에서 다시 해당 노드 복구
- 2대 장애 시
  - HAProxy에서 wsrep_local_state 값을 확인하여 장애 확인하고 해당 노드들 차단
  - 남아있는 노드에서 Primary Component를 수동으로 복구
  - 복구된 노드 하나를 Primary Component에 합류시킴
  - 이후 HAProxy에서 다시 해당 노드들 복구
- 3대 장애 시
  - 가장 최근에 종료되었거나 상태가 최신인 노드를 찾아 복구.
  - 해당 노드를 기반으로 클러스터를 부트스트랩
  - 부트스트랩된 노드가 정상 동작하면 다른 노드들을 클러스터에 다시 추가
  - 최신 백업을 사용해 클러스터를 초기화
  - HAProxy에서 다시 세 노드들 연결
  - 추가적으로 데이터 유실을 최대한 방지하기 위해 주기적인 클러스터 백업 및 자동화된 복구 스크립트 준비
  - 전체 장애 발생을 최대한 방지하기 위해 노드들을 서로 다른 데이터센터에 분산 배치
</div>
</details>

<details>
<summary>HAProxy</summary>
<div markdown="1">

- keepalived를 사용하여 Active-standby 상태로 공유된 가상 IP를 이용하여 접속
- 주 HAProxy가 응답하지 않을 경우 예비 HAProxy로 VIP를 자동 전환
- 장애 복구 후 VIP가 다시 Primary HAProxy로 돌아오도록 설정
- 추가로 HAProxy 설정 파일을 주기적으로 동기화 하여 동일한 환경 유지
- 혹은 글로벌 서버 로드밸런싱을 사용하여 다중 지역 HAProxy를 사용
</div>
</details> -->

## 성능
 - SQL 쿼리
    - [chats 성능 체크](https://github.com/beyond-sw-camp/be17-1st-jamjaris-PhanesEditor/blob/main/img/chats%20%EC%84%B1%EB%8A%A5.png)
    - 100만개의 채팅 기록을 만들어 채팅기록 조회 성능을 확인했다.
    - index를 사용해 기록을 단축시켰다.
    - [성능개선](https://github.com/beyond-sw-camp/be17-1st-jamjaris-PhanesEditor/blob/main/img/image.png)