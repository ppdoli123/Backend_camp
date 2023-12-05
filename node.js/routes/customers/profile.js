var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");


  router.get('/', function(req, res, next) {
    fs.readFile("./views/customers/profile.html", (err, data)=> {
      if (err) {
        res.send("interest page error");
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        //res.write("<p>index.js에서 쓴 test</p>");
        res.end();
      }
    });
  });

  router.post("/", async (req, res) => {
    console.log(req.body)
    const {
      body: {id}
    } = req

    const info = await mysql.query("userInfo", id);
  let user= [info[0].id, info[0].name, info[0].oneline, info[0].grade]

    let cntPlace = await mysql.query("viewPlacePost", id);
    console.log("cntPlace: ",cntPlace.length);
    user.push(cntPlace.length);
    let cntRecipe = await mysql.query("viewRecipePost", id);
    user.push(cntRecipe.length);

    let cntFollow = await mysql.query("viewfollower", id);
    user.push(cntFollow.length);

    console.log("user: ",user);
    res.send(user);
  });
  

  
module.exports = router;
