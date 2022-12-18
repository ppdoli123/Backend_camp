const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();
const crypto = require('crypto')
const jwt = require('jsonwebtoken');
let token = '';

//회원 관리를 위한 3개의 API endpoint를 포함한 함수

router.get("/", async (req, res) => {
  const customers = await mysql.query("customerList");
  console.log(customers);
  res.send(customers);
});

//맛집 카테고리 데이터
router.post("/p_change_data", async function (req, res, next) {

  const category = req.body
  console.log(category)

  if (category.foodT == '' && category.country !== '') {
    console.log("1")
    const place_info2 = await mysql.query("p_country",category.country);
    const place_point2 = await mysql.query("p_point_country",category.country);
    res.send({"first":place_info2, "second":place_point2})
    res.end();
  }

  else if (category.country == '' && category.foodT !== '') {
    console.log("2")
    const place_info2 = await mysql.query("p_foodT",category.foodT);
    const place_point2 = await mysql.query("p_point_foodT",category.foodT);
    res.send({"first":place_info2, "second":place_point2})
    res.end();
  }

  else if (category.country !== '' && category.foodT !== '') {
    console.log("3")
    const place_info2 = await mysql.query("p_all",[category.country,category.foodT]);
    const place_point2 = await mysql.query("p_point_all",[category.country,category.foodT]);
    res.send({"first":place_info2, "second":place_point2})
    res.end();
  }
  
  else {
    console.log("4")
    const place_info2 = await mysql.query("place");
    const place_point2 = await mysql.query("place_point");
    res.send({"first":place_info2, "second":place_point2})
    res.end();
  }


});

//레시피 카테고리 데이터
router.post("/r_change_data", async function (req, res, next) {
  //문자열로 받은 데이터의 check
  
//----------------서버로 받기----------------------
  const category = req.body
  console.log(category)

  if (category.foodT !== '') {
    console.log("1")
    const recipe_info2 = await mysql.query("r_foodT",category.foodT);
    const recipe_point2 = await mysql.query("r_point_foodT",category.foodT);
    res.send({"first":recipe_info2, "second":recipe_point2})
    res.end();
  }
  
  else {
    console.log("2")
    const recipe_info2 = await mysql.query("recipe");
    const recipe_point2 = await mysql.query("recipe_point");
    res.send({"first":recipe_info2, "second":recipe_point2})
    res.end();
  }


});


//검색
router.get('/search', async function(req, res, next) {
  const arr=[]
  const place_info = await mysql.query("place");
  const recipe_info = await mysql.query("recipe");
  place_info.forEach((el,index) => {
    arr.push({type:"p",key:el.p_key, name:el.placeName, foodT:""})
  });
  recipe_info.forEach((el,index) => {
    arr.push({type:"r",key:el.r_key, name:el.RCP_NM , foodT:el.food1})
  });

  res.send(arr)
});

let cnt_comment=[]
router.post("/p_upload_comment", async (req, res) => {
  console.log("body: ",req.body)
  const {
    body: {p_key, writer, text}
  } = req
  console.log("key: ", p_key)

  let name = await mysql.query("getName", writer)
  console.log("name: ", name[0].name)
  // 댓글 db에 저장
  let p_comment = { "p_key": p_key, "writer": writer, "text": text, "writer_name": name[0].name};
  console.log("p_comment: ", p_comment)
  let write_comment = await mysql.query("writeCommentPlace", p_comment); // 작성한 댓글 DB에 저장

  cnt_comment = await mysql.query("viewPcommentbyID", writer); // 댓글 개수 세기
  cnt_R = await mysql.query("viewRcommentbyID", writer);
  cnt_comment.push(cnt_R[0])
  if(cnt_comment.length >= 3){
    let upgrade = await mysql.query("upgrade", ["gold", writer]);
    console.log("upgrade")
  }
  res.send("<script>alert('댓글 작성이 완료됐습니다.');location.href='/place_review_detail';</script>");
});

router.post("/p_bookmark", async (req, res) => {
  console.log("body: ",req.body)
  const {
    body: {p_key2, id}
  } = req

  let book ={ "id": id, "keyy": p_key2, "category": '0'};
  console.log("book: ", book)
  let find = await mysql.query("checkBookmark", [id, '0', p_key2]);
  if(find.length == 0){ // 안 한 상태
    let bookmark = await mysql.query("saveBookmark", book);
    res.send("<script>alert('북마크에 추가되었습니다.');location.href='/place_review_detail';</script>");
  } else { // 이미 북마크한 상태
    console.log("이미 북마크한 상태");
    res.send("<script>location.href='/place_review_detail';</script>");
  }
  });

router.post("/p_recommand", async (req, res) => {
  console.log("body: ",req.body)
  const {
    body: {p_key3}
  } = req
  let rec =p_key3;
  console.log("rec: ", rec)
  let find = await mysql.query("placekey", rec);
  console.log("find: ", find)
  let recommand = await mysql.query("recommandPlace", [find[0].recommand+1, rec]);
  res.send("<script>alert('추천되었습니다.');location.href='/place_review_detail';</script>");
});

router.post("/r_recommand", async (req, res) => {
  console.log("body: ",req.body)
  const {
    body: {r_key3}
  } = req
  let rec =r_key3;
  let find = await mysql.query("recipekey", rec);
  let recommand = await mysql.query("recommandRecipe", [find[0].recommand+1, rec]);
  res.send("<script>alert('추천되었습니다.');location.href='/recipe_review_detail';</script>");
});

router.post("/r_bookmark", async (req, res) => {
  console.log("body: ",req.body)
  const {
    body: {r_key2, id}
  } = req

  let book ={ "keyy": r_key2, "id": id, "category": '1'};
    console.log("book: ", book)
  let find = await mysql.query("checkBookmark", [id, '1', r_key2]);
  if(find.length == 0){ // 안 한 상태
    let bookmark = await mysql.query("saveBookmark", book);
    res.send("<script>alert('북마크에 추가되었습니다.');location.href='/recipe_review_detail';</script>");
  } else { // 이미 북마크한 상태
    console.log("이미 북마크한 상태");
    res.send("<script>location.href='/recipe_review_detail';</script>");
  }
  });

router.post("/r_upload_comment", async (req, res) => {
  console.log("body: ",req.body)
  const {
    body: {r_key, writer, text}
  } = req

  let name = await mysql.query("getName", writer)
  // 댓글 db에 저장하는 코드
  let r_comment = { "r_key": r_key, "writer": writer, "text": text, "writer_name": name[0].name};
  let write_comment = await mysql.query("writeCommentRecipe", r_comment); // 작성한 댓글 DB에 저장
  cnt_comment = await mysql.query("viewPcommentbyID", writer); // 댓글 개수 세기
  cnt_R = await mysql.query("viewRcommentbyID", writer);
  cnt_comment.push(cnt_R[0])
  if(cnt_comment.length >= 3){
    let upgrade = await mysql.query("upgrade", ["gold", writer]);
    console.log("upgrade")
  }
  res.send("<script>alert('댓글 작성이 완료됐습니다.');location.href='/recipe_review_detail';</script>");
});


//로그인API
router.post("/login", async (req, res) => {
  //form으로 전달받음
  const {
    body: {id, pw, name, oneline}
  } = req
  //ID 존재 여부
  const idresult = await mysql.query("useridCheck", id);
  if (Object.values(idresult[0])==1) {//존재하면
    const pwcoded = btoa(pw)//클라이언트에서 서버로 넘길때 인코딩하기 때문에
    const password = await makePasswordHashed(id, pwcoded);//입력받은 값으로 salt값을 이용해 비교
    
    const realpwQ = await mysql.query("userpwCheck", id);//실제 비번에 대한 값 찾기
    const realpw = realpwQ[0].pw

    if (realpw == password) {//비번도 같으면 로그인 성공
      token = jwt.sign({id:id, name: name, oneline: oneline},   //JWT토큰화
        'secret_key', 
        {expiresIn: "60m", 
        issuer:id
      });
    //home화면으로
    res.send("<script>alert('로그인 성공');location.href='/interest';</script>");
    }
    else{
      //login화면으로
      res.send("<script>alert('로그인 실패, 비밀번호의 잘못된 입력');location.href='/login';</script>");
    }
  }
  else{
    //login화면으로
    res.send("<script>alert('로그인 실패, 존재하지 않는 ID');location.href='/login';</script>");
  }

  
});

//token값 전달을 위한 get
router.get("/login", async (req, res) => {
  console.log("token: ", token)
  res.json({'token':token});
});


//회원가입 API
router.post("/join", async (req, res) => {
  //form으로 전달받음
  console.log(req.body)
  const {
    body: {newID, newPW, name, year, month, day}
  } = req

  const birthday = year+"-"+month+"-"+day
  const { pw, salt } = await createHashedPassword(newPW);//salt를 이용한 암호화
  const oneline = "";

  let info = { "id": newID ,  "pw": pw, "name":name, "birthday":birthday, "grade":"silver",
  "interest":"", "salt":salt, "oneline": oneline};//DB형식에 맞춰 저장
  
  const result = await mysql.query("userInsert", info);//DB에 삽입 후 로그인 페이지로 이동

  token = jwt.sign({id:newID, name:name, oneline:oneline},   //JWT토큰화
        'secret_key', 
        {expiresIn: "5m", 
        issuer:newID
      });

  res.send("<script>alert('회원가입이 완료됐습니다.');location.href='/interest';</script>");
  
});


//로그아웃 API
router.get("/logout", function (req, res, next) {
  //로그인페이지로 이동(sessionStorage 이용을 위해)
  token = "";
  res.send("<script>alert('로그아웃 되었습니다.');location.href='/';</script>");

});

//salt값 정하기
const createSalt = () =>
  new Promise((resolve, reject) => {
      crypto.randomBytes(64, (err, buf) => {
          if (err) reject(err);
          resolve(buf.toString('base64'));
      });
  });
//salt값을 이용한 암호화
const createHashedPassword = (plainPassword) =>
  new Promise(async (resolve, reject) => {
      const salt = await createSalt();
      crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
          if (err) reject(err);
          resolve({ pw: key.toString('base64'), salt });
      });
  });
//로그인을위한 비밀번호 검증
const makePasswordHashed = (id, pw) =>
  new Promise(async (resolve, reject) => {
      const saltQ = await mysql.query("usersaltCheck", id);
      const salt = saltQ[0].salt
      crypto.pbkdf2(pw, salt, 9999, 64, 'sha512', (err, key) => {
          if (err) reject(err);
          resolve(key.toString('base64'));
      });
  });

  router.get("/edit", async (req, res) => {
    res.json({'token':token});
  });

  
// 회원 정보 수정 API
router.post("/edit", async (req, res) => {
  console.log(req.body)
  const {
    body: {id, name, newPW, oneline, year, month, day, interest}
  } = req

  const birthday = year+"-"+month+"-"+day
  const { pw, salt } = await createHashedPassword(newPW); //salt를 이용한 암호화

  let info = { "pw": pw, "name":name, "birthday":birthday, "interest":"", "salt":salt, "oneline": oneline,  "id": id};//DB형식에 맞춰 저장
const result = await mysql.query("userUpdate", [pw, name, birthday, "", salt, oneline, id]); //DB에 삽입 후 로그인 페이지로 이동
 
  token = jwt.sign({id:id, name:name, oneline: oneline},   //JWT토큰화
        'secret_key', 
        {expiresIn: "5m", 
        issuer:id
      });

  res.send("<script>alert('프로필 수정이 완료됐습니다.');location.href='/profile';</script>");
  });


module.exports = router;
