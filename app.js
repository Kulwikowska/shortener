var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));

mongoose.connect("mongodb://localhost/myapp");

var linkSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    url: String,
    shorten: String
});

var Link = mongoose.model("Link", linkSchema);

//index route
app.get("/", function(req, res) {
    res.render("index");
});

// new route 
app.get("/links/new", function(req, res) {
    res.render("links/new");
});

app.post("/api/links", function(req, res) {
    var url = req.body.url;
    var newLink = { url: url }
    Link.create(newLink, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            newlyCreated.shorten = newlyCreated._id.toString().substring(0, 7);
            newlyCreated.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("index");
                }
            });
        }
    });
});




app.listen(8080, "127.0.0.1", function() {
    console.log("The Server Has Started!");
});