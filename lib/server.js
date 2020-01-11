var express = require("express");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(express.static(__dirname + "/../public"));
app.set("view engine", "ejs");

module.exports = app;