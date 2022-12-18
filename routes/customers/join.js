const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();
const fs = require("fs");



/* GET home page. */
router.get("/", function (req, res, next) {
  fs.readFile("./views/customers/join.html", async (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
});

//ID중복 여부 판단
router.post("/", async (req, res) => {
  if (req.body.hasOwnProperty('newID')) {

    const {
      body: {newID}
    } = req
  
  
    const result = await mysql.query("useridCheck", newID);
    if (Object.values(result[0])==1) {
      console.log("같은 ID가 존재")
    }
    else{
      console.log("사용 가능한 ID")
    }
    res.send(Object.values(result[0]))
    
  }

  else{
    const {
      body: {name}
    } = req
  
  
    const result = await mysql.query("usernameCheck", name);
    if (Object.values(result[0])==1) {
      console.log("같은 닉네임이 존재")
    }
    else{
      console.log("사용 가능한 닉네임")
    }

    res.send(Object.values(result[0]))
  }


  
});
  

  









module.exports = router;
