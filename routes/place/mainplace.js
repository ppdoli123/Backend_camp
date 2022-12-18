var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");
const ejs = require("ejs");



router.use(express.json());



  router.get('/', async function(req, res, next) {
    const place_info = await mysql.query("place");
    const place_point = await mysql.query("place_point");
    res.render("mainplace",{data : place_info , place : place_point});
      
    
  });

  router.post("/", async (req, res) => {
    const {
      body: {id}
    } = req
    console.log("id: ",id)
    let grade = await mysql.query("viewGrade", id);
    console.log("grade: ", grade)
    res.send(grade);
    });



  module.exports = router;
