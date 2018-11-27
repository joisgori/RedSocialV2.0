var mongoose = require('mongoose');
var commitModel = require('../models/commit');


let controller = {};


controller.getAllCommits = function (req, res) { console.log('all');
    commitModel.find({}, function (err, commits) {
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

controller.getAllCommitsOne = function (req, res) {
    console.log(req.params.username);
    commitModel.find({username: req.params.username}, function (err, commits) {
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
        commit: req.body.post
    };
    commitModel.findByIdAndUpdate(req.params.id, update, function (err, old) {
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


controller.insertCommit = function(req,res){
    let commitNew = new commitModel({
        commit: req.body.commit,
        username: req.body.username
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

controller.deleteCommit =  function(req,res){
    commitModel.findByIdAndRemove(req.params.id, function(err, eliminado){
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