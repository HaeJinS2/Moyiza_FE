# Moyiza - 모임 서비스
이 프로젝트는 사용자들이 모임을 생성하고, 참가하며, 서로 소통할 수 있는 공간을 제공하는 웹 애플리케이션입니다. 

![모이자썸네일](https://file.notion.so/f/s/b0217d60-40f3-4aa8-997c-d28ed8c3dc07/Frame_14.png?id=8d4c7847-2a61-4c77-9872-21e31dbac007&table=block&spaceId=d15a4e1d-e301-4395-ba47-1d253789fd34&expirationTimestamp=1688104800000&signature=l60iROXmN0HANBOSna-gMskBMcly-99ZiSQADyBQYVA&downloadName=Frame+14.png)

<br/>

## ✔️ 프로젝트 기능 소개
주요 기능들은 다음과 같습니다.

### 사용자 관련 기능

- 회원 가입: 사용자는 이메일을 통해 회원 가입을 할 수 있습니다. 이메일 인증 절차를 통해 신뢰성을 확보합니다.

- 로그인/로그아웃: 사용자는 자신의 계정으로 로그인할 수 있으며, 로그인 상태에서 로그아웃을 할 수 있습니다.

- 회원정보 수정: 로그인된 사용자는 자신의 정보를 수정할 수 있습니다.

- 마이페이지: 사용자는 자신의 정보와 참여한 모임, 생성한 모임 등을 확인할 수 있는 마이페이지를 가지고 있습니다.

### 일상속 관련 기능

- 일상속 생성: 사용자는 새로운 모임을 생성할 수 있습니다. <br>
  생성 과정에서 카테고리 선택, 태그 선택, 제한 설정(성별, 나이), 최대 인원 설정 등을 할 수 있습니다.

- 클럽 조회/참여/탈퇴: 사용자는 생성된 클럽들을 조회하고, 자신이 원하는 클럽에 참여하거나 탈퇴할 수 있습니다.

- 클럽 멤버 관리: 클럽의 생성자 또는 관리자는 클럽 멤버들을 관리(강퇴, 초대 등)할 수 있습니다.

### 채팅 관련 기능

- 채팅방: 클럽 멤버들은 클럽에 속한 채팅방에서 실시간으로 대화할 수 있습니다.

### 이벤트 관련 기능

- 이벤트 생성/조회/참여: 클럽 내에서 이벤트를 생성하고, 이벤트 정보를 조회하며, 이벤트에 참여할 수 있습니다.

- 이벤트 후기 등록: 클럽 내에서 이벤트를 참여한 후 지난 이벤트 카드에서 후기를 등록할 수 있습니다.

### 하루속 이벤트 관련 기능

- 하루속 이벤트 생성/조회/참여: 사용자는 일회성 이벤트인 원데이 이벤트를 생성하고, 이를 조회하며, 참여할 수 있습니다.<br>
  생성 과정에서 카테고리 선택, 태그 선택, 모이는 시간, 모이는 장소, 제한 설정(성별, 나이), 최대 인원 설정 등을 할 수 있습니다.

위의 기능들을 바탕으로 사용자들은 다양한 모임을 즐길 수 있으며, 커뮤니티를 형성할 수 있습니다.

### 알림 기능

- 하루속 관리자는 하루속 참가 신청에 대한 알림을 받을 수 있습니다.

### 내 위치기반 이벤트 추천 기능

- 내 위치를 기반으로 주변에서 진행될 이벤트를 확인할 수 있습니다.
</br>

## ✔️ 기술 아키텍쳐
![아키텍쳐](https://file.notion.so/f/s/1442a192-6fd6-486f-8685-9739bb8a0a01/architecture.jpg?id=f9071ddd-a209-4dd1-a8ac-d33ca7019502&table=block&spaceId=d15a4e1d-e301-4395-ba47-1d253789fd34&expirationTimestamp=1688104800000&signature=dsWM4k0SmG8aVtP2kvoIyelBJMozwcba1hxdsrVwLU4&downloadName=architecture.jpg)

<br/>

## ✔️ 기술적 의사 결정


| 선택 기술 | 선택이유 및 근거 |
| --- | --- |
| HTTPS | - 클라이언트와 서버 사이의 통신을 암호화 하여 MITM 방지 </br>- 사용자 신뢰도 향상 </br>- SEO 최적화 </br>- 브라우저 지원으로 인한 사용자 경험 향상(HTTPS 아니면 경고띄워주니까) |
| Cloud-Front | - S3에 정적 파일을 호스팅하고 CloudFront로 콘텐츠를 전송하면 AWS의 엣지 로케이션에서 콘텐츠를 캐시. </br>- 사용자가 가장 가까운 서버에서 콘텐츠를 제공받을 수 있으므로 레이턴시가 적어지고 사용자 경험이 향상되기 때문에 선택함. |
| CI/CD | - 배포 자동화를 위해 깃헙 액션 도입, 시간을 단축하고 백엔드와 프론트엔드 간의 테스트 및 협업에 유용.</br>- 다른 CI/CD 툴들에 비해 비교적 짧은 러닝커브, 간결성으로 인해 소규모 프로젝트에서 사용하기 적합한 툴이라 생각 되어 깃헙액션을 도입함. |
| Tailwind-CSS | 반복적인 CSS 코드 작성을 줄이고, 보다 커스텀화된 UI를 신속하게 구축할 수 있기 때문에 선택함. |
| Websocket | WebSocket은 클라이언트와 서버 간의 양방향 통신을 가능하게 하며, HTTP를 사용하여 연결을 초기화한 후에는 해당 연결을 유지하고 더 이상 HTTP를 사용하지 않으므로 오버헤드가 상대적으로 적기 때문에 선택함. |
| React Query | 서버 상태 관리를 단순화하고, 데이터 동기화, 캐싱, 백그라운드 업데이트 등을 효율적으로 수행할 수 있게 해주기 때문에 선택함. |
| Recoil | 리덕스에 비해 간결한 전역 상태관리와 보일러 플레이트를 줄여주기 때문에 선택함. |

</br>

## ✔️ 설치 방법
### 필요한 소프트웨어

- Node.js (설치 필요)

- NPM (Node.js를 설치하면 함께 설치됩니다) || Yarn (설치 필요)

- Git (이미 설치되어 있다고 가정)

### 1단계: 의존성 설치

다운로드 받은 프로젝트 디렉토리로 이동하고, 다음 명령을 실행하여 필요한 라이브러리를 설치합니다.


```
npm install
```
```
yarn install
```
위 명령을 실행하면, package.json에 명시된 모든 의존성이 프로젝트에 설치됩니다.

### 2단계: 프로젝트 실행

아래의 명령을 실행하여 서버를 시작합니다.


```
npm start
```
```
yarn start
```

이후 웹 브라우저에서 http://localhost:3000 (또는 콘솔에 출력된 다른 주소)를 열어 프로젝트를 확인합니다.

</br>

## ✔️ 업데이트내역
- 0.0.1
  - 작업 진행 중
 
</br>

## ✔️ 정보
홍종훈([GitHub](https://github.com/whdgnszz1))

정해진([GitHub](https://github.com/HaeJinS2))

김민정([GitHub](https://github.com/minnjeong))
