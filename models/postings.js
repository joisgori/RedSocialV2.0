var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    post: {
        type:String, 
        required:true
    }, 
    username: {
        type:String, 
        required:true
    } 
});

module.exports = mongoose.model('posts', PostSchema);