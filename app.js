var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Link = require("./models/link")

var linkRoutes = require("./routes/link")

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use("/", linkRoutes);
app.locals.moment = require('moment');

mongoose.connect("mongodb://localhost/myapp");

app.listen(8080, "127.0.0.1", function() {
    console.log("The Server Has Started!");
});