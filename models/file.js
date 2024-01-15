const mongoose = require("mongoose");

const FileScema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    password: String,
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    }
},{timestamps:true});

const File = mongoose.model('File', FileScema);
module.exports = File;