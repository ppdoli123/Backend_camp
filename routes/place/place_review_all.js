var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");
const ejs = require("ejs");

let p_name = { "p_name": "", };

//----------post---------------------------
router.use(express.json());
router.post("/", function (req, res, next) {
    //문자열로 받은 데이터의 check
    
//----------------서버로 받기----------------------
    const temp = req.body
    // console.log(temp)
    p_name.p_name = temp.p_name
    res.send(p_name)
    res.end();

});

router.get('/', async function(req, res, next) {
  console.log(p_name.p_name)
  const place_info = await mysql.query("placename",p_name.p_name);
  res.render("place_total_review",{data : place_info});
  console.log(place_info)
    
});


module.exports = router;