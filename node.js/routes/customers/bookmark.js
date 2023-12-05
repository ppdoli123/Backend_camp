const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
let token = '';
const fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  fs.readFile("./views/customers/bookmark.html", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});


router.post("/", async (req, res) => {
  const place_li = []
  const recipe_li = []
  const {
    body: {id}
  } = req
  console.log(id)
  const bookmark = await mysql.query("viewBookmark", id);

  let placePosts=[], recipePosts=[], all=[]

  for (let index = 0; index < bookmark.length; index++) {
    const category = bookmark[index].category
    if (category == 0) { //place
      place_li.push(bookmark[index].keyy)
      let place = await mysql.query("placekey", bookmark[index].keyy);
      console.log("place: ", place)
      for(let i=0; i<place.length; i++){
        placePosts.push([place[i].placeName, place[i].title, place[i].image1, place[i].p_key ]) //제목, 이미지, key
    }
    console.log("placePosts: ", placePosts)

    }
    else{ //recipe
      recipe_li.push(bookmark[index].keyy)
      let recipe = await mysql.query("recipekey",  bookmark[index].keyy); // follow가 작성한 글
      for(let i=0; i<recipe.length; i++){
          recipePosts.push([recipe[i].RCP_NM, recipe[i].image, recipe[i].r_key,]) // 레시피 이름, 이미지, key, 카테고리2
      }
      console.log("recipePosts: ", recipePosts)
    }
  }
   all.push(placePosts, recipePosts)
   console.log("all: ",all)
   res.send(all);
 
  //const bookmark_list = {'place':place_li , 'recipe':recipe_li }
  //res.send(bookmark_list)

});


// //로그인API
// router.post("/login", async (req, res) => {
//   //form으로 전달받음
//   const {
//     body: {id, pw, name, oneline}
//   } = req
//   //ID 존재 여부
//   const idresult = await mysql.query("useridCheck", id);
//   if (Object.values(idresult[0])==1) {//존재하면
//     const pwcoded = btoa(pw)//클라이언트에서 서버로 넘길때 인코딩하기 때문에
//     const password = await makePasswordHashed(id, pwcoded);//입력받은 값으로 salt값을 이용해 비교
    
//     const realpwQ = await mysql.query("userpwCheck", id);//실제 비번에 대한 값 찾기
//     const realpw = realpwQ[0].pw

//     if (realpw == password) {//비번도 같으면 로그인 성공
//       token = jwt.sign({id:id, name: name, oneline: oneline},   //JWT토큰화
//         'secret_key', 
//         {expiresIn: "5m", 
//         issuer:id
//       });
//     //home화면으로
//     res.send("<script>alert('로그인 성공');location.href='/interest';</script>");
//     }
//     else{
//       //login화면으로
//       res.send("<script>alert('로그인 실패, 비밀번호의 잘못된 입력');location.href='/login';</script>");
//     }
//   }
//   else{
//     //login화면으로
//     res.send("<script>alert('로그인 실패, 존재하지 않는 ID');location.href='/login';</script>");
//   }

  
// });

// //token값 전달을 위한 get
// router.get("/login", async (req, res) => {
//   res.json({'token':token});
// });


// //회원가입 API
// router.post("/join", async (req, res) => {
//   //form으로 전달받음
//   console.log(req.body)
//   const {
//     body: {newID, newPW, name, year, month, day}
//   } = req

//   const birthday = year+"-"+month+"-"+day
//   const { pw, salt } = await createHashedPassword(newPW);//salt를 이용한 암호화
//   const oneline = "";

//   let info = { "id": newID ,  "pw": pw, "name":name, "birthday":birthday, "interest":"", "salt":salt, "oneline": oneline};//DB형식에 맞춰 저장
  
//   const result = await mysql.query("userInsert", info);//DB에 삽입 후 로그인 페이지로 이동

//   token = jwt.sign({id:newID, name:name, oneline:oneline},   //JWT토큰화
//         'secret_key', 
//         {expiresIn: "5m", 
//         issuer:newID
//       });

//   res.send("<script>alert('회원가입이 완료됐습니다.');location.href='/enter';</script>");
  
// });




module.exports = router;
