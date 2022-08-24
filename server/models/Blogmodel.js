const { default: mongoose } = require("mongoose");


const blogSchema = new mongoose.Schema({
    header: String,
    subheader: String,
    author: String,
    date: Date,
    body: [{
        title: String,
        imageId:String,
        description: String,
        text: String
    }],
    likes: Number,
    dislikes: Number,
    comments: [{
        title: String,
        author: String,
        date: Date,
        body: String,
        likes: Number,
        dislikes: Number
    }]
});

module.exports = mongoose.model("Blog", blogSchema);