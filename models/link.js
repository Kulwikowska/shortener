var mongoose = require("mongoose");

var linkSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    url: String,
    shorten: String,
    clicks: int
});

var clickSchema = new mongoose.Schema({
    datetime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", linkSchema);