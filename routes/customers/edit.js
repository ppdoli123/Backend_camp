var express = require('express');
var router = express.Router();
const fs = require("fs");

router.get("/", function (req, res, next) {
    fs.readFile("./views/customers/profile_edit.html", async (err, data) => {
        if (err) {
        res.send("error");
        } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
        }
    });
});


module.exports = router;
