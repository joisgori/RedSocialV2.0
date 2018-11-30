var express = require('express');
var router = express.Router();
//var postController = require('../controller/principalControler');
//const AuthMiddleware = require("../middlewares/AuthMiddleware");

//router.use(AuthMiddleware.isAuthentication);

/* GET users listing. */
//router.get('/', function(req, res, next) {res.render('principal');});

router.get('/posting/:username', postController.getAll);

router.get('/:id', postController.getOne);

// Create
router.post('/', postController.insert);

// UPDATE
router.put('/:id', postController.update);

// Delete
router.delete('/:id',postController.delete);


module.exports = router;


/*
//Patrón para crear las rutas
router.get('/signup', function(req, res, next) { //Cambiaré la ruta de signup
  //res.render('Nombre de archivo pug)
  res.render('formulario');
});

router.post('/signup',postController.store);*/
