var mongoose = require('mongoose');

var CommitSchema = new mongoose.Schema({
    email: {
        type:String, 
        required:true,
        unique:true
    },
    friends:[String]
});

module.exports = mongoose.model('friend', CommitSchema);
