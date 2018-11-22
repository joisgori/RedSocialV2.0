const userController = {} 

userController.store = function(req,res,next)
{
    console.log(req.body);
    res.send({send:"nudes"});
}

module.exports = userController;