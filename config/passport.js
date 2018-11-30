const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');//el que se creo en module exports al final de users.js
const User2 = require('../models/friends');

///const friends = require("../controller/friendControler")

module.exports = function(passport){

    passport.serializeUser(function(user,done){
done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
User.findById(id,function(err, user){
    done(err,user);
});
    });
        //Metodo que permite registrarse
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({'local.email':email}, function(err,user){
            if (err){return done(err);}
            if(user){
                return done (null,false, req.flash('signupMessage', 'El email ya existe'));
            } else{
                var newUser = new User();
                console.log(req.body);
                newUser.local.userId=req.body._id;
                newUser.local.email=email;
                newUser.local.password=newUser.generateHash(password);
                newUser.local.name=req.body.name;
                newUser.local.lastname=req.body.lastname;
                newUser.local.birthday=req.body.birthday;
                newUser.save(function(err){
                    //friends.insertFriends(email);
                    
                    /*if(err){throw err;}
                    passport.deserializeUser(function(id,done){
                        done(err, newUser);
                    });*/
                    console.log("estoyaquijndnjc");
                    //res.send(user).end();
                    console.log("estoyaqui");
                    var newFr = new User2();
                    newFr.email=email;
                    newFr.friends=[];
                    newFr.save(function(err){
                        console.log("save");
                    })
                    return done(null,newUser);                   
                });
               

            }
        })
    }));

       //Metodo que permite logearse
       passport.use('local-login', new LocalStrategy({
        usernameField:'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({'local.email':email}, function(err,user){
            if (err){return done(err);}
            if(!user){
                return done (null,false, req.flash('loginMessage', 'El usuario no ha sido encontrado'));
            } 
            if (!user.validatePassword(password)){
                return done(null, false, req.flash('loginMessage', 'Wrong Password'));
            }
            return done(null,user); 
        })
    }));
}