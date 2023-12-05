const { Server } = require("socket.io");

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  let re_num=0;
  let turn=0;
  let counter = 10;
  let user = {};
  let count =0; //서버들어온순서 but 1번일때 새로고침하면 3번으로 고정됨
  const name=[]; //닉네임 저장하는공간 disconnect되면 삭제됨
  io.on("connection", (socket) => {
    // 접속 시 서버에서 실행되는 코드
    count ++;
    const socket_num =count;
    let isStop = false;
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
      io.emit("error",nickname_1);
      if(name.indexOf(nickname_1)>-1){
      var i = name.indexOf(nickname_1);
      name.splice(i,1);
      }
      console.log(user);
   
    });
    socket.on("enter_list", (data) => {
      // 생성한 이벤트 이름 enter 호출 시 실행되는 callback
      nickname_1=data;
      if(name.indexOf(nickname_1)<0){
        if(name.length<3){
      name.push(nickname_1);
      user[socket.id].nickname=data;
      console.log(name.length);
      socket.emit("enter", { id: data, num: name.length, num_2:socket_num });
      }
      else{
        io.emit("delete",data );
        console.log(data);
      }
    }

      
    });

    socket.on("re_enter", (data) => {
      re_num= re_num + 1;
      socket.emit("enter_re", {id:data, num:re_num, num_2:user.length});
    });

    socket.on("member",(data) =>{
      io.emit("member_list",{id:data,point:user[socket.id].point});
    });;
    socket.on("exit", (data) => {
      io.emit("exit_btn",data);
    })
    socket.on("wait_name", (data)=>{
      io.emit("wait", data);
    })
    socket.on("start",(data) => {
      const num =  Math.floor(Math.random() * 3);
      console.log(name,name[num]);
      console.log(user);
      turn= num;
      io.emit("start_turn",name[num]);
    })
    socket.on("next_turn",(id,num) =>{
      console.log(turn);
      socket.emit("start_turn",name[turn%3])
    });
    socket.on("turn_ser",(data)=>{
      socket.emit("turn",data);
    });
    socket.on("alarm",(data)=>{
      io.emit("alarm_start");
    })
    // 모두에게
    socket.on("input", (data) => {
      io.emit("msg", { id: nickname_1, message: data, socketid:socket.id });
      turn ++;
    });

    socket.on("countdownbtn",(data) => {
      isStop=false;
      counter=10;
      const cdb = setInterval(() =>{
        if(!isStop){
          if(counter==0){
            console.log("턴종료!");
            io.emit("count_exit",data);
            clearInterval(cdb);
          }
          else{
            counter--;            
            socket.emit("countdown",{number:`${counter}`});
          }}
          else{
            clearInterval(cdb);
          }
        },1000);      
    });
    socket.on("countdownstopbtn", (data) =>{
      isStop=true;
    });
    socket.on("score_exit", (data) => {
      user[socket.id].point +=1;
      io.emit("result",user);
    })
    socket.on("score_list",(data)=> {
      
        if(user[socket.id].nickname==data){
        for(let i in user) {
          if(user[i].nickname == "users nickname"){
          }
          else{
          user[i].point +=1;
          if(user[i].nickname==data){
            user[i].point --;
            console.log(user);
            
          }
        }}
        io.emit("result",user);
        re_num=0;
      }
    });
    
  });
};
module.exports = socketHandler;
