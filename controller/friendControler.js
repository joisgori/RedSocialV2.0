var mongoose = require('mongoose');
var commitModel = require('../models/friends');


let controller = {};


controller.getAllFriends = function (req, res) { console.log('all');
    commitModel.find({}, function (err, friends) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {            
            res.json({
                ok: true,
                friends
            });
        }
    });
};

controller.getAllFriendsOne = function (req, res) {//    console.log(req.params.username);
    commitModel.find({email:req.params.email}, function (err, commits) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                ko: true,
                err
            });
        } else {            
            res.json({
                ok: true,
                com: 'eventuali',
                commits
            });
        }
    });
};


controller.update = function (req, res) {
    // Falta validar si exiten los atributos
    let update = {
        $push : {friends:req.body.friend}
    };
    commitModel.findOneAndUpdate(req.params.email, update, function (err, old) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                err
            })
        } else {
            res.json({
                ok: true,
                old,
                update
            });
        }
    });
};


controller.insertFriends = function(req,res){
    let commitNew = new commitModel({
        email:req.body.email,
        friends: []
    });

    commitNew.save(function(err,insertado){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                insertado
            });
        }
    });
};

controller.deleteFriend =  function(req,res){
    commitModel.findOneAndRemove(req.params.email, function(err, eliminado){
        if(err){
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                eliminado
            });
        }
    });
}

controller.deleteOneFriend =  function(req,res){
let update = {
    $pop : {friends:req.body.friend}
};
commitModel.findOneAndUpdate(req.params.email, update, function (err, old) {
    if (err) {
        res.status(500);
        res.json({
            ok: false,
            err
        })
    } else {
        res.json({
            ok: true,
            old,
            update
        });
    }
});
}




module.exports = controller;








/**imagenes
 * 
var upload = multer({dest: "./uploads"});
var mongo = require('mongodb');
var Grid = require("gridfs-stream");
Grid.mongo = mongo;

router.post('/:id', upload.array('photos', 200), function(req, res, next){
gfs = Grid(db);
var ss = req.files;
   for(var j=0; j<ss.length; j++){
     var originalName = ss[j].originalname;
     var filename = ss[j].filename;
     var writestream = gfs.createWriteStream({
         filename: originalName
     });
    fs.createReadStream("./uploads/" + filename).pipe(writestream);
   }
});

<form action="/" method="post" enctype="multipart/form-data">
<input type="file" name="photos">
 */