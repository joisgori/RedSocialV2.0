var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    post: {
        type:String, 
        required:true
    }, 
    username: {
        type:String, 
        required:true
    } ,
    likes: number,
    dislikes:number
});

module.exports = mongoose.model('posting', PostSchema);