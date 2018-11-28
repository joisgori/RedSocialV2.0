var mongoose = require('mongoose');

var CommitSchema = new mongoose.Schema({
    commit: {
        type:String, 
        required:true
    }, 
    username: {
        type:String, 
        required:true
    },
    _idpost:{
        type:String, 
        required:true
    }
});

module.exports = mongoose.model('commit', CommitSchema);
