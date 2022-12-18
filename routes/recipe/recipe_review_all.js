var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");
const ejs = require("ejs");

let r_type = { "r_type": "", };

//----------post---------------------------
router.use(express.json());
router.post("/", function (req, res, next) {
    //문자열로 받은 데이터의 check
    
//----------------서버로 받기----------------------
    const temp = req.body
    // console.log(temp)
    r_type.r_type = temp.r_type
    res.send(r_type)
    res.end();

});


  router.get('/', async function(req, res, next) {
    const recipe_info = await mysql.query("recipename",r_type.r_type);
    res.render("recipe_total_review",{data : recipe_info });
    console.log(recipe_info)
  });


module.exports = router;