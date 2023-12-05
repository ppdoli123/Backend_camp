var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");

let r_key = { "r_key": "", };


//----------post---------------------------
router.use(express.json());
router.post("/", function (req, res, next) {
    //문자열로 받은 데이터의 check
    
//----------------서버로 받기----------------------
    const temp = req.body
    // console.log(temp)
    r_key.r_key = temp.r_key
    res.send(r_key)
    res.end();

});


router.get('/', async function(req, res, next) {
  // const selected_recipe_info = await mysql.query("recipekey",r_key.r_key);
  // res.render("recipe_detail_review",{data : selected_recipe_info });
  // console.log(r_key.r_key)
  // console.log(selected_recipe_info)

  const selected_recipe_info = await mysql.query("recipe");
  // console.log(selected_place_info)
  let r_c = await mysql.query("viewRcomment", r_key.r_key)
  console.log("r_c: ", r_c)
  res.render("recipe_detail_review",{data : selected_recipe_info ,r_key : r_key.r_key,  r_comment: r_c, r_comcnt: r_c.length});

  console.log(r_key.r_key)

});


// router.post("/", async (req, res) => {
//   console.log("body: ",req.body)
//   const {
//     body: {r_key, writer, text}
//   } = req
//   console.log("key: ", r_key)


//   // 댓글 db에 저장하는 코드
//   let r_comment = { "r_key": r_key, "writer": writer, "text": text};
//   console.log("r_comment: ", r_comment)
//   let write_comment = await mysql.query("writeCommentRecipe", r_comment); // 작성한 댓글 DB에 저장

//   res.send("<script>alert('댓글 작성이 완료됐습니다.');location.href='/recipe_review_detail';</script>");
// });


module.exports = router;