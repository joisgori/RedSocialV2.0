var express = require('express');
var router = express.Router();
var commitController = require('../controller/friendControler');
//const AuthMiddleware = require("../middlewares/AuthMiddleware");
//router.use(AuthMiddleware.isAuthentication);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('friends', { title: 'Express' });
  });
router.get('/all', commitController.getAllFriends);
router.post('/',commitController.insertFriends);
router.put('/:email',commitController.update);
router.delete('/:email',commitController.deleteOneFriend);

//router.get('/:_idpost', commitController.getAllCommitsOne);
module.exports = router;