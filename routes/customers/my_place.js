const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();
const fs = require("fs");


  router.get('/',function(req, res, next) {
    fs.readFile("./views/customers/my_place.html",async (err, data)=> {
      if (err) {
        res.send("my place page error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  });

  router.post("/", async (req, res) => {
    const list = []
    const {
      body: {id}
    } = req
    console.log("id: ",id)
    let myplacelist = await mysql.query("viewPlacePost", id);
    console.log("myPlacePost: ",myplacelist);

    for(let i=0; i<myplacelist.length; i++){
        list.push([myplacelist[i].placeName, myplacelist[i].title, myplacelist[i].image1, myplacelist[i].p_key])
    }
    console.log("list: ",list);
    res.send(list);
    });

  
module.exports = router;