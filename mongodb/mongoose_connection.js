var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = "mongodb://localhost:27500/people";
mongoose.connect(url, {
    useMongoClient: true
});

var doc = {
    number: Number,
    president: String,
    birth_year: Number,
    death_year: Number,
    took_office: String,
    left_office: String,
    party: String
}

var schema = new mongoose.Schema(doc);

var PRESIDENTCLASS = mongoose.model('presidents', schema);

module.exports = PRESIDENTCLASS;