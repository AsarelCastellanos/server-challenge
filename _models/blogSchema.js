var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create Blog - Schema
var blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
});

var Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;