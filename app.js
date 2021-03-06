var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Link = require("./models/link"),
    Click = require("./models/click"),
    linkRoutes = require("./routes/link");

app.locals.moment = require('moment');

// mongoose.connect("mongodb://localhost/myapp");
mongoose.connect("mongodb://agnieszkak:e725galo@ds219000.mlab.com:19000/shortened");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use("/", linkRoutes);

app.listen(8080, "127.0.0.1", function() {
    console.log("The Server Has Started!");
});