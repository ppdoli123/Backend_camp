var express = require('express');
var router = express.Router();
const fs = require("fs");
const mysql = require("../../mysql/index.js");
const multer = require('multer')
const path = require('path');

router.get('/', function(req, res, next) {
  fs.readFile("./views/recipe/write_recipe.html", (err, data)=> {
    if (err) {
      res.send("write_recipe page error");
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


router.post("/", upload.fields([  { name: 'mainPic' }, { name: 'pic1' }, 
// { name: 'pic2' },  { name: 'pic3' },  { name: 'pic4' }, { name: 'pic5' },
]), async (req, res) => {
  console.log("body: ",req.body)
  const {
    body: {id, title, mainPic, pic, content, food1, ingre}
  } = req
  console.log(req.files);
  console.log(req.files.mainPic[0].path);
  // console.log(req.files.pic2[0].path);
  // console.log(req.files.pic3[0].path);
  // console.log(req.files.pic4[0].path);
  // console.log(req.files.pic5[0].path);
  let img =["", "", "", "", "", ""];
  if(req.files.pic1 != undefined)
    img[1] = req.files.pic1[0].path;
  if(req.files.pic2 != undefined)
    img[2] = req.files.pic2[0].path;
  if(req.files.pic3 != undefined)
    img[3] = req.files.pic3[0].path;
  if(req.files.pic4 != undefined)
    img[4] = req.files.pic4[0].path;
  if(req.files.pic5 != undefined)
    img[5] = req.files.pic5[0].path;
  img[0] = req.files.mainPic[0].path;

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

  let info = { "id": id ,  "RCP_NM":title, "image":img[0], "image": img[0], "MANUAL_IMG01": img[1], "MANUAL_IMG02": img[2], "MANUAL_IMG03": img[3], "MANUAL_IMG04": img[4], "MANUAL_IMG05": img[5],
  "text": content, "food1": food1, "RCP_PARTS_DTLS":ingre, "date": date};//DB형식에 맞춰 저장
  console.log("info: ", info)
  let write = await mysql.query("writeRecipe", info); // 작성한 맛집 게시글 DB에 저장

  res.send("<script>alert('글 작성이 완료됐습니다.');location.href='/mainrecipe';</script>");
});


module.exports = router;