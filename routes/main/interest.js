const express = require("express");
const router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");
const ejs = require("ejs");

  router.get('/', async function(req, res, next) {
    const place_info = await mysql.query("place");
    const recipe_info = await mysql.query("recipe");
    res.render("interest",{ recipe : recipe_info, place : place_info });
  });

module.exports = router;