var mongoose = require("mongoose");

var linkSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    url: String,
    shorten: String,
    clicks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Click"
    }]
});



module.exports = mongoose.model("Link", linkSchema);