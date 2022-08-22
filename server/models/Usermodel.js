const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    doMail: Boolean,
    birthDate: Date
});

module.exports = mongoose.model("User", userSchema);