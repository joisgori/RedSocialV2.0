var express = require('express');
var router = express.Router();
//var postController = require('../controller/principalControler');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('principal');
});

/*
//Patrón para crear las rutas
router.get('/signup', function(req, res, next) { //Cambiaré la ruta de signup
  //res.render('Nombre de archivo pug)
  res.render('formulario');
});

router.post('/signup',postController.store);*/

module.exports = router;
