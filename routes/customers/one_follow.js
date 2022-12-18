var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");

// 다른 사람 프로필 화면

  router.get('/', function(req, res, next) {
    fs.readFile("./views/customers/one_follow.html", (err, data)=> {
      if (err) {
        res.send("interest page error");
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        //res.write("<p>index.js에서 쓴 test</p>");
        res.end();
      }
    });
  });

  router.post("/", async (req, res) => {
    let all=[]
    const followinfo=[]
    let placePosts=[]
    let recipePosts=[]
    const {
      body: {id, myid}
    } = req
    console.log("팔로우 대상id: ",id, myid)
    let follow = await mysql.query("userInfo", id); // follow에 대한 모든 info (userdb)
    console.log("follow: ",follow)

    let p_post = await mysql.query("viewPlacePost", id); // follow가 작성한 글
    console.log("post: ",p_post)
    for(let i=0; i<p_post.length; i++){
        placePosts.push([p_post[i].placeName, p_post[i].title, p_post[i].image1, p_post[i].p_key ]) // 장소 이름, 제목, 이미지, key
    }
//    console.log("placePosts: ",placePosts)

    let r_post = await mysql.query("viewRecipePost", id); // follow가 작성한 글
    console.log("post: ",r_post)
    for(let i=0; i<r_post.length; i++){
        recipePosts.push([r_post[i].RCP_NM, r_post[i].image, r_post[i].r_key,]) // 레시피 이름, 이미지, key, 카테고리2
    }

      followinfo.push([follow[0].id, follow[0].name, follow[0].oneline, follow[0].grade])
      followinfo.push(p_post.length)
      followinfo.push(r_post.length) 
      let cntFollow = await mysql.query("viewfollower", id);
      followinfo.push(cntFollow.length)
      console.log("followinfo: ",followinfo) // 팔로우 정보 (아이디, 이름, 한줄소개)

    all.push(followinfo, placePosts, recipePosts)
    console.log("all: ",all)
    res.send(all);
  
    });


    router.post("/follow", async (req, res) => {
      const {
        body: {follow_id, my_id}
      } = req
      console.log(follow_id, my_id);
      let insert = { "id" : my_id, "follow": follow_id };
      let ch = [ my_id, follow_id ];
      let check = await mysql.query("checkFollow", ch);
      console.log("check: ",check);

      if(check.length == 0){ // 팔로우 안 한 상태일 때
        await mysql.query("follow", insert);
        res.send("<script>alert('팔로우했습니다.');location.href='/one_follow';</script>");
      } else { // 이미 팔로우했을 때
        console.log("이미 팔로우한 상태");
        res.send("<script>location.href='/one_follow';</script>");
      }
      });

      router.post("/unfollow", async (req, res) => {
        const {
          body: {follow_id, my_id}
        } = req
        let insert = [ my_id, follow_id ];
        let unFollow = await mysql.query("unfollow", insert);
        res.send("<script>alert('언팔로우했습니다.');location.href='/one_follow';</script>");
        });
      
  module.exports = router;