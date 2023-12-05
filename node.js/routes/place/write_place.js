var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");

const multer = require('multer')
const path = require('path');

router.get('/', function(req, res, next) {
  fs.readFile("./views/place/write_place.html", (err, data)=> {
    if (err) {
      res.send("write_place page error");
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    }
  });
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

router.post('/',upload.array('pic'),(req,res) => {
  console.log("body: ",req.body)
  const {
    body: {id, place, title, pic, loc, menu, content, country, food}
  } = req
  console.log(req.files)

  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;
  var hours = ('0' + today.getHours()).slice(-2); 
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2); 
var timeString = hours + ':' + minutes  + ':' + seconds;
let date = dateString+" "+timeString;

let img = ["", "", "", "", ""];
for(let i=0; i<req.files.length; i++){
    img[i] = req.files[i].path;
}

  let info = { "id": id ,  "placeName": place, "title":title, "image1": img[0], "image2": img[1], "image3": img[2], "image4": img[3], "image5": img[4],
//  "image3": "/"+req.files[2].path, "image4": "/"+req.files[3].path, "image5": "/"+req.files[4].path,
  "menu1":menu[0], "menu2":menu[1], "address":loc, "text": content,
"country": country, "foodType": food,  "date":date};//DB형식에 맞춰 저장

  console.log("info: ", info)
  let write = mysql.query("writePlace", info); // 작성한 맛집 게시글 DB에 저장

   res.send("<script>alert('글 작성이 완료됐습니다.');location.href='/mainplace';</script>");
});

module.exports = router;