const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();
const fs = require("fs");



  router.get('/',function(req, res, next) {
   
    fs.readFile("./views/customers/follower.html",async (err, data)=> {
      if (err) {
        res.send("main recipe page error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  });

  router.post("/", async (req, res) => {
    const followsid = []
    const followinfo=[]
    const {
      body: {id}
    } = req
    console.log(id)
    const followlist = await mysql.query("viewfollow", id);
    console.log("followlist: ",followlist)

let follows=[];
    for (let index = 0; index < followlist.length; index++) {
      followsid.push(followlist[index].follow)
      follows.push( await mysql.query("userInfo", followsid[index]));
    }
      console.log(follows)
      for (let index = 0; index < followlist.length; index++) {
      console.log("follow id: ",follows[index][0].id)
      followinfo.push([follows[index][0].id, follows[index][0].name, follows[index][0].oneline])
      }
      console.log("followinfo: ",followinfo) // 사용자가 팔로우한 사람들의 정보(아이디, 이름, 한줄소개)
    res.send(followinfo);

    });

  /*
  router.post("/", async (req, res) => {
  const follow = []
  const {
    body: {id}
  } = req
  console.log(id)
  const follower = await mysql.query("viewfollower", id);
  for (let index = 0; index < follower.length; index++) {
    follow.push(follower[index].follow_id)
  }
  console.log(follow);
  res.send(follow);
  });
  */

  
module.exports = router;