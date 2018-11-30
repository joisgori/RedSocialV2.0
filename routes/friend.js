var express = require('express');
var router = express.Router();
var commitController = require('../controller/friendControler');
//const AuthMiddleware = require("../middlewares/AuthMiddleware");
//router.use(AuthMiddleware.isAuthentication);

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('friends', { title: 'Express' });
  });
  router.post('/',commitController.insertFriends);
  router.put('/',commitController.update);
router.delete('/',commitController.deleteOneFriend);
router.get('/all', commitController.getAllFriends);
router.get('/one/:email', commitController.getAllFriendsOne);
router.get("/allOne",commitController.getAllFriendsAll);



//router.get('/:_idpost', commitController.getAllCommitsOne);
module.exports = router;