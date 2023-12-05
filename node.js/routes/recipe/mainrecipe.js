const express = require("express");
const router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");
const ejs = require("ejs");




router.use(express.json());




router.get('/', async function(req, res, next) {
  const place_info = await mysql.query("recipe");
  const recipe_point = await mysql.query("recipe_point");
  res.render("mainrecipe",{data : place_info , recipe : recipe_point});
  
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

