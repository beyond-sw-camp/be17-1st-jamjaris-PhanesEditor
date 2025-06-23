# Phanes Editor
<p align="middle" style="margin: 0; padding: 0;">
  <!-- <img width="200px" src="./assets/image/5ven icon.png"> -->
</p>

<p align="middle">
<h1>한화시스템 BEYOND SW캠프</h1>
<br>팀: 잠자리들
</p>

## 팀원 소개

<figure>
    <table>
      <tr>
        <td align="center">팀원: <a href="https://github.com/why48382">이현식</a></td>
        <td align="center">팀원: <a href="https://github.com/junsun-yeam">염준선</a></td>
        <td align="center">팀원: <a href="https://github.com/flcat" >권재찬</a></td>
        <td align="center">팀원: <a href="https://github.com/Jumil1">임주식</a></td>
      </tr>
    </table>
</figure>


## 프로젝트 소개

> 'Phanes Editor'는 별도의 프로그램 설치 없이 웹 브라우저만으로 실시간 코드 공유 및 동시 편집이 가능한 웹 기반 페어 프로그래밍 서비스입니다.



## 🍔 기술 스택

![HAProxy](https://img.shields.io/badge/HAProxy-00A1E0?style=for-the-badge&logo=haproxy&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white)



## 🎞 프로젝트 기획서
[프로젝트 기획서](./assets/프로젝트%20기획서.pdf)

## 요구사항 정의서 
[요구사항 정의서](./img/요구사항정의서.png)

<br>

## ERD
![ERD](./img/%EC%84%A4%EA%B3%84%20ERD.png)
<br>

## DDL
[DDL](./assets/sql/phanes.sql)

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

## 기본 SQL구문

### 회원가입

INSERT INTO users (
  user_id, nickname, profil_img, platform_key, platform, create_date, status, last_login, browser
) VALUES (
  10001, '준선이', 'exampleabcdefghijk.qwer', 'kakao_9999', 1, NOW(), 'a', NOW(), 'Chrome'
);

▶ [회원가입](./img/회원가입.png)

### 기존 유저 인증

SELECT user_id 
FROM users 
WHERE platform_key = 'kakao_9999' 
  AND platform = 1 
  AND status = 'a';

▶ [기본유저기능](./img/기본유저인증.png)


## 🏎️ 성능 개선

### Why?
#### idx_chats_project_id_sent_at_desc 인덱스 분석
CREATE INDEX idx_chats_project_id_sent_at_desc ON chats (project_id, sent_at DESC);

왜 이 인덱스를 만들었을까?
이 인덱스는 주로 다음과 같은 쿼리의 성능을 향상시키기 위해 설계.

특정 project_id의 채팅 메시지를 최신순으로 가져올 때:

예시 쿼리: SELECT * FROM chats WHERE project_id = 123 ORDER BY sent_at DESC LIMIT 10;
이 쿼리는 특정 프로젝트의 채팅 메시지 중에서 가장 최근에 전송된 메시지들을 가져올 때 사용. 이 인덱스는 project_id로 먼저 빠르게 해당 프로젝트의 채팅들을 찾고, 그 안에서 sent_at이 이미 내림차순(최신순)으로 정렬되어 있기 때문에 별도의 정렬 작업 없이 바로 데이터를 가져올 수 있음. 인덱스가 없다면 project_id로 필터링한 후 다시 sent_at 기준으로 정렬하는 추가적인 과정이 필요해 훨씬 느려짐
특정 project_id의 채팅 메시지를 범위로 검색할 때:

예시 쿼리: SELECT * FROM chats WHERE project_id = 123 AND sent_at > '2025-06-01 00:00:00' ORDER BY sent_at DESC;
이 쿼리도 project_id를 기준으로 검색하고, sent_at에 대한 범위 조건과 정렬이 함께 사용될 때 인덱스가 유용.
인덱스 컬럼 순서의 중요성 (project_id, sent_at DESC)
인덱스에 여러 컬럼이 사용될 때는 컬럼의 순서가 매우 중요함. 이 인덱스의 경우 (project_id, sent_at DESC) 순서임.

요약
idx_chats_project_id_sent_at_desc 인덱스는 특정 project_id를 기준으로 채팅 메시지를 검색하고, 그 결과를 최신 sent_at 순으로 빠르게 가져오기 위해 최적화된 전략적인 인덱스임. 특히 서비스에서 '특정 프로젝트의 최근 채팅 목록'을 보여주는 기능이 있다면 이 인덱스가 핵심적인 역할하게 됨.

CREATE INDEX idx_chats_project_id_sent_at_desc 
ON chats (project_id, sent_at DESC);  

#### 성능 개선 전
![image](./img/chats%20%EC%84%B1%EB%8A%A5.png)

#### 성능 개선 후 ㅎㅜ

![image](./img/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202025-06-19%20%EC%98%A4%ED%9B%84%206.00.12.png)



