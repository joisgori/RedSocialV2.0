var express = require('express');
var router = express.Router();
var commitController = require('../controller/commitControler');

/* GET users listing. */
router.get('/', commitController.getAllCommits);

router.get('/:username', commitController.getAllCommitsOne);

// Create
router.post('/', commitController.insertCommit);

// UPDATE
router.put('/:id',commitController.update);

// Delete
router.delete('/:id',commitController.deleteCommit);


module.exports = router;


/*
//Patrón para crear las rutas
router.get('/signup', function(req, res, next) { //Cambiaré la ruta de signup
  //res.render('Nombre de archivo pug)
  res.render('formulario');
});

router.post('/signup',postController.store);*/
