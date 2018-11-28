var mongoose = require('mongoose');
var postingModel = require('../models/posting');


let controller = {};

// Obtener todos los usuarios
controller.getAll = function (req, res) {
    postingModel.find({}, function (err, posts) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {            
            res.json({
                ok: true,
                posts
            });
        }
    });
};

controller.getAllPostingsOne = function (req, res) {//    console.log(req.params.username);
    postingModel.find({username: req.params.username}, function (err, posts) {
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
                posts
            });
        }
    });
};


controller.getOne = function (req, res) {
    postingModel.findOne({username:req.params.username}, function (err, post) {
        if (err) {
            res.status(500);
            res.json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                post
            });
        }
    });
};

controller.update = function (req, res) {
    // Falta validar si exiten los atributos
    let update = {
        post: req.body.post,
        likes:req.body.likes,
        dislikes:req.body.dislikes
    };
    postingModel.findByIdAndUpdate(req.params.id, update, function (err, old) {
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

controller.insert = function(req,res){
    let postNew = new postingModel({
        post: req.body.post,
        username: req.body.username,
        likes: 0,
        dislikes:0
    });

    postNew.save(function(err,insertado){
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

controller.delete =  function(req,res){
    postingModel.findByIdAndRemove(req.params.id, function(err, eliminado){
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