const { Server } = require("socket.io");

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  let user = {};
  let count =0;
  const name=[];
  io.on("connection", (socket) => {
    // 접속 시 서버에서 실행되는 코드
    count ++;
    const socket_num =count;
 
    const userSocketIdMap = new Map();
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
      count --;
    });
    socket.on("enter_list", (data) => {
      // 생성한 이벤트 이름 enter 호출 시 실행되는 callback
      socket.emit("enter", { id: data, num: socket_num });
      name.push(data);
      user.nickname=data;
    });
    socket.on("user_name", (msg) => {
      // 생성한 이벤트 이름 event1 호출 시 실행되는 callback
      console.log(name);
      socket.emit("getID", { id: msg, num: socket_num });
    });

    socket.on("start",(data) => {
      const turn = [
        name[Math.ceil(Math.random() * name.length) - 1],
      ];
      console.log(name,turn);
      let strturn= turn.join();
      socket.emit("start_turn",strturn)
      // io.sockets.socket().emit('message', '안녕');
      // if(name_array[0]==data){
      //   socket.emit("start_first",data)
      //   console.log(data, "차례입니다.");
      // }
      // else{
      //   console.log(data, "차례아닙니다");
      // }

    })
    socket.on("join", (socketId) => { 
      if (userSocketIdMap.size === 0) { 
        userSocketIdMap.set(0, "user1"); 
        turn = "user1"; 
        io.emit("join", { 
          username: userSocketIdMap.get(0), socketId }); 
          //user1 
      } else {
          userSocketIdMap.set(1, "user2"); 
          io.emit("join", { 
              username: userSocketIdMap.get(1), socketId 
          }); //user2 
      } 
    });
    
    socket.on("message", (message) => { 
        if (turn === "user1") { 
          turn = "user2"; 
            } else { 
              turn = "user1"; 
            } 
        io.emit("message", { message, turn }); 
        }); 
    // 모두에게
    socket.on("input", (data) => {
      io.emit("msg", { id: name, message: data });
      //console.log(socket.id, " 가 보낸 메시지 : ", data);
      console.log(user);
    });
    socket.on("score_list", (data) => {
      socket.broadcast.emit("msg", { id: name, message: data });
      //console.log(socket.id, " 가 보낸 메시지 : ", data);
      console.log(user);
    });

    // 본인 제외한 모든 소켓
    socket.on("inputWM", (data) => {
      socket.broadcast.emit("msg", { id: name, message: data });
      //console.log(data, " 를 받았는데, 본인 빼고 broadcast 해야함");
    });

    // 특정 소켓
    socket.on("private", (id, data) => {
      io.to(id).emit("msg", { id: socket.id, message: data });
      //console.log(socket.id, " 가 ", id, " 에게 보내는 메시지 : ", data);
    });
  });
};
module.exports = socketHandler;
