var express = require("express");
var router = express.Router();
var Link = require("../models/link");
var Click = require("../models/click");


//INDEX - show all links
router.get("/", function(req, res) {
    Link.find({}).sort({ createdAt: -1 }).exec(function(err, allLinks) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { allLinks: allLinks, host: req.headers.host });
        }
    })
});

// NEW - show form to create new shorted link
router.get("/links/new", function(req, res) {
    res.render("links/new");
});


// CREATE - show new link and short it
router.post("/api/links", function(req, res) {
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
                    res.redirect("/");
                }
            });
        }
    });
});

// shorted link redirect
router.get("/:shorten", function(req, res) {
    var shorten = req.params.shorten;
    Link.findOne({ shorten: shorten }, function(err, link) {
        if (err) {
            console.log(err);
        } else {
            Click.create({}, function(err, click) {
                if (err) {
                    console.log(err);
                    return;
                }
                link.clicks.push(click);
                link.save();
                res.redirect(link.url);
            });
        }
    });
});

module.exports = router;