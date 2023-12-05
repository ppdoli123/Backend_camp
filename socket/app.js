var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var debug = require("debug")("express-skeleton-html:server");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var waitRouter = require("./routes/wait");
var resultRouter = require("./routes/result");
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", waitRouter);
app.use("/result", resultRouter);
app.use("/index", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
var server = app.listen(app.get('port'), function() {
  console.log("listening on port 80");
  debug('Express server listening on port ' + server.address().port);
});
app.set('port', process.env.PORT || 80);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("something wrong!");
});

module.exports = app;
