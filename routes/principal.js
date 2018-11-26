var express = require('express');
var router = express.Router();
//var postController = require('../controller/principalControler');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('principal');
});

router.get('/', UserController.getAll);
router.get('/:id', UserController.getOne);
// Create
router.post('/', UserController.insert);

// UPDATE
router.put('/:id', UserController.update);

// Delete
router.delete('/:id',UserController.delete);

module.exports = router;


/*
//Patrón para crear las rutas
router.get('/signup', function(req, res, next) { //Cambiaré la ruta de signup
  //res.render('Nombre de archivo pug)
  res.render('formulario');
});

router.post('/signup',postController.store);*/

module.exports = router;
