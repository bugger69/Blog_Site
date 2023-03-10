const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    titleImage: String,
    content: String,
    likes: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Blog', BlogSchema);