var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");
const ejs = require("ejs");

let p_key = { "p_key": "", };

//----------post---------------------------
router.use(express.json());
router.post("/", function (req, res, next) {
    //문자열로 받은 데이터의 check
    
//----------------서버로 받기----------------------
    const temp = req.body
    // console.log(temp)
    p_key.p_key = temp.p_key
    res.send(p_key)
    res.end();

});
/*
router.get('/', async function(req, res, next) {
  const selected_place_info = await mysql.query("place");
  console.log("select: ", selected_place_info)
   res.render("place_detail_review",{data : selected_place_info ,p_key : p_key.p_key});
  console.log(p_key.p_key)
  // res.end();
  
});
*/
router.get('/', async function(req, res, next) {
  const selected_place_info = await mysql.query("place");
  console.log("select: ", selected_place_info)

  console.log(selected_place_info[0])
  let p_c = await mysql.query("viewPcomment", p_key.p_key)
  console.log("p_c: ", p_c)
  res.render("place_detail_review",{data : selected_place_info ,p_key : p_key.p_key, p_comment: p_c, p_comcnt: p_c.length});
  console.log(p_key.p_key)
});


// router.post("/", async (req, res) => {
//   console.log("body: ",req.body)
//   const {
//     body: {p_key, writer, text}
//   } = req
//   console.log("key: ", p_key)

module.exports = router;