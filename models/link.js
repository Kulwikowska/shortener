var mongoose = require("mongoose");

var linkSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    url: String,
    shorten: String
});

module.exports = mongoose.model("Link", linkSchema);