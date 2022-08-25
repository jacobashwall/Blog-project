const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    desc: String,
    uploader: String
});

module.exports = new mongoose.model('Image', imageSchema);