var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const ejs = require("ejs");

var multer = require('multer');
var fs = require('fs');

// 홈 관리
var homeRouter = require("./routes/main/home");
var interestRouter = require("./routes/main/interest");
var searchRouter = require("./routes/main/search");
var infoRouter = require("./routes/main/info");

// 회원관리
var followerRouter = require("./routes/customers/follower");
var loginRouter = require("./routes/customers/login");
var joinRouter = require("./routes/customers/join");
var enterRouter = require("./routes/customers/enter");
var usersRouter = require("./routes/api/users");
var profileRouter = require("./routes/customers/profile");
var editRouter = require("./routes/customers/edit");
var bookmarkRouter = require("./routes/customers/bookmark");
var onefollowRouter = require("./routes/customers/one_follow");
var myplaceRouter = require("./routes/customers/my_place");
var myrecipeRouter = require("./routes/customers/my_recipe");

// 맛집 관리
var mainplaceRouter = require("./routes/place/mainplace");
var placeReview_a_Router = require("./routes/place/place_review_all");
var placeReview_d_Router = require("./routes/place/place_review_detail");
var placeWriteRouter = require("./routes/place/write_place");


// 레시피 관리
var mainrecipeRouter = require("./routes/recipe/mainrecipe");
var recipeReview_a_Router = require("./routes/recipe/recipe_review_all");
var recipeReview_d_Router = require("./routes/recipe/recipe_review_detail");
var recipeWriteRouter = require("./routes/recipe/write_recipe");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
//app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use('/public', static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

var storage = multer.diskStorage({
  destination: function(req, file, callback){
      callback(null, 'uploads')
  },
  filename: function(req, file, callback){
      callback(null, file.originalname + Date.now())
  }
});

var upload = multer({
  storage: storage,
  limits: {
      files: 10,
      fileSize: 1024*1024*1024
  }
});

// 홈
app.use("/", homeRouter);
app.use('/interest', interestRouter);
app.use('/search', searchRouter);
app.use('/info', infoRouter);

// 회원
app.use("/join", joinRouter);
app.use("/login", loginRouter);
app.use("/enter", enterRouter);
app.use("/api/users", usersRouter);
app.use('/follower', followerRouter);
app.use('/profile', profileRouter);
app.use('/edit', editRouter);
app.use('/bookmark', bookmarkRouter);
app.use('/one_follow', onefollowRouter);
app.use('/my_place', myplaceRouter);
app.use('/my_recipe', myrecipeRouter);


// 맛집
app.use('/mainplace', mainplaceRouter);
app.use('/place_review_all', placeReview_a_Router);
app.use('/place_review_detail', placeReview_d_Router);
app.use('/write_place', placeWriteRouter);

// 레시피
app.use('/mainrecipe', mainrecipeRouter);
app.use('/recipe_review_all', recipeReview_a_Router);
app.use('/recipe_review_detail', recipeReview_d_Router);
app.use('/write_recipe', recipeWriteRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("something wrong!");
});

// app.listen(80, ()=>{
//     console.log("80 port listening");
// });


module.exports = app;
