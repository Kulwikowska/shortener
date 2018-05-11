var mongoose = require("mongoose");

var clickSchema = new mongoose.Schema({
    datetime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Click", clickSchema);