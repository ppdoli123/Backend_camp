const { Server } = require("socket.io");

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  let user = {};
  let count =0; //서버들어온순서 but 1번일때 새로고침하면 3번으로 고정됨
  const name=[]; //닉네임 저장하는공간 disconnect되면 삭제됨
  io.on("connection", (socket) => {
    // 접속 시 서버에서 실행되는 코드
    count ++;
    let isstop=false;
    let counter =10;
    const socket_num =count;
    let nickname_1;
    const req = socket.request;
    const socket_id = socket.id;
    const client_ip =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("connection!");
    console.log("socket ID : ", socket_id);
    console.log("client IP : ", client_ip);
    console.log("몇번째? : ", socket_num);

    user[socket.id] = { nickname: "users nickname", point: 0 };

    socket.on("disconnect", () => {
      // 사전 정의 된 callback (disconnect, error)
      console.log(socket.id, " client disconnected");
      delete user[socket.id];
      count -- ;
      var i = name.indexOf(nickname_1);
      name.splice(i,1);
    });
    socket.on("enter_list", (data) => {
      // 생성한 이벤트 이름 enter 호출 시 실행되는 callback
      socket.emit("enter", { id: data, num: socket_num, socketid:socket_id });
      nickname_1=data;
      name.push(nickname_1);
      user[socket.id].nickname=data;
    });

    socket.on("start",(data) => {
      const num =  Math.floor(Math.random() * 3);
      console.log(name,name[num]);
      io.emit("start_turn",name[num])
    })
    socket.on("next_turn",(id,num) =>{
      io.emit("start_turn",name[num%3])
    });
    // 모두에게
    socket.on("input", (data) => {
      io.emit("msg", { id: nickname_1, message: data, socketid:socket.id });
      //console.log(socket.id, " 가 보낸 메시지 : ", data);
      console.log(user);
    });
    socket.on("score_list", (data) => {
      io.emit("result", user);
      //console.log(socket.id, " 가 보낸 메시지 : ", data);
      console.log(user);
    });
    socket.on("countdownbtn",(id,data) => {
      isstop=false;
      counter=10;
      const cdb = setInterval(() =>{
        if(!isstop){
          if(counter==0){
            console.log("턴종료!");
            clearInterval(cdb);
          }
          else{
            counter--;
            
            io.to(socket_id).emit("countdown",{number:`${counter}`});
          }}
          else{
            clearInterval(cdb);
          }
        },1000);      
    });
    socket.on("countdownstopbtn", (id,data) =>{
      isstop=true;
    });
    socket.on("score_list",(data)=> {
      for(let i in user) {
        user[i].point +=1;
      }
      if(user[socket.id].nickname==data){
        user[socket.id].point--;
      }
    })
  });
};
module.exports = socketHandler;
