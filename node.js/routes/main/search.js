const express = require("express");
const router = express.Router();
const fs = require("fs");



  router.get('/', function(req, res, next) {
    fs.readFile("./views/main/search.html", (err, data)=> {
      if (err) {
        res.send("main recipe page error");
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        //res.write("<p>index.js에서 쓴 test</p>");
        res.end();
      }
    });
  });

module.exports = router;