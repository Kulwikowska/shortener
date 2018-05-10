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



// new route 
app.get("/links/new", function(req, res) {
    res.render("links/new");
});


//index route
app.get("/", function(req, res) {
    Link.find({}, function(err, allLinks) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { allLinks: allLinks });
        }
    })
});

app.post("/api/links", function(req, res) {
    var url = req.body.link.url;
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
                    console.log(newlyCreated);
                    res.render("index", { link: newlyCreated });
                }
            });
        }
    });
});


app.get("/:shorten", function(req, res) {
    var shorten = req.params.shorten;
    Link.findOne({ shorten: shorten }, function(err, link) {
        if (err) {
            console.log(err);
        } else {
            console.log(link);
            res.redirect(link.url);
        }
    });
});











app.listen(8080, "127.0.0.1", function() {
    console.log("The Server Has Started!");
});