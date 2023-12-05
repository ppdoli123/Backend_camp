const express = require("express");
const mysql = require("../../mysql/index.js");
const router = express.Router();
const fs = require("fs");


  router.get('/',function(req, res, next) {
    fs.readFile("./views/customers/my_recipe.html",async (err, data)=> {
      if (err) {
        res.send("my recipe page error");
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
    const myRecipelist = await mysql.query("viewRecipePost", id);
    console.log("myRecipePost: ",myRecipelist);

    for(let i=0; i<myRecipelist.length; i++){
        list.push([myRecipelist[i].RCP_NM, myRecipelist[i].image, myRecipelist[i].r_key])
    }
    console.log("list: ",list);
    res.send(list);
    });

  
module.exports = router;