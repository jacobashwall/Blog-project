const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    doMail: Boolean,
    birthDate: Date,
    readLater:[{type: mongoose.ObjectId}]
});

module.exports = mongoose.model("User", userSchema);