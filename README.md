# express_socket
## 🖥️ 프로젝트 소개
socket.io 를 사용하여 사용자들이 반응형으로 지하철 게임을 진행할수있게 만들었으며, 총 3인이 웹페이지에 들어오면 게임이 시작되고 그외 대기자들은 현재 진행중인 게임 상태를 관전할 수 있게 만들었습니다.

## 🕰️ 개발 기간
* 22.12.02일 - 22.12.14일

### ⚙️ 개발 환경
- `Socket.io`
- `Java Script`

## 📌 주요 기능
#### 서버는 3개의 클라이언트가 Ready 상태가 되면, 자동으로 게임을 시작한다.
- 사용자는 대기 화면에서 이름을 입력한 후 submit 버튼을 누르면, Ready 상태가 된다.
- 응답의 순서는 랜덤으로 결정된다.
- 3번째 이후로 들어온 4번째 클라이언트부터는 게임에 참여할 수 없고, 대기한다.
#### 한 게임이 종료되면 각 클라이언트는 재시작 여부를 결정할 수 있고, 셋 다 다시하기를 누르면 대기자와 관계없이 기존 클라이언트 간 새로운 게임을 시작한다.
- 게임은 클라이언트가 접속을 종료하여 3개 미만으로 감소하지 않는 한 계속 수행되어야 하며, 모든
클라이언트는 누적 점수를 확인할 수 있다.
**패배 조건**: 10초 내 무응답, 오답 (1호선이 아닌 역명, 기존 답변과 중복되는 역)
**점수 처리**: 패자를 제외한 나머지 사용자의 점수를 +1
- 중간에 일부 클라이언트의 접속이 종료되면 해당 게임을 종료한다. 남아있는 클라이언트들의 점수는
유지된다.
