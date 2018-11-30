var express = require('express');
var router = express.Router();
var commitController = require('../controller/postingControler');
//const AuthMiddleware = require("../middlewares/AuthMiddleware");
//router.use(AuthMiddleware.isAuthentication);

/* GET users listing. */
router.get('/', commitController.getAll);

router.get('/:username', commitController.getAllPostingsOne);

// Create
router.post('/', commitController.insert);

// UPDATE
router.put('/:id',commitController.update);

// Delete
router.delete('/:id',commitController.delete);


module.exports = router;


/*
//Patrón para crear las rutas
router.get('/signup', function(req, res, next) { //Cambiaré la ruta de signup
  //res.render('Nombre de archivo pug)
  res.render('formulario');
});

router.post('/signup',postController.store);*/
