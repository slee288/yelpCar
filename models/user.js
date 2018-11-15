var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//starts to add in methods to our users
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);