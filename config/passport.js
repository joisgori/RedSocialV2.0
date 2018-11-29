const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');//el que se creo en module exports al final de users.js

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
                newUser.local.email=email;
                newUser.local.password=newUser.generateHash(password);
                newUser.local.name=req.body.name;
                newUser.local.lastname=req.body.lastname;
                newUser.local.birthday=req.body.birthday;
                newUser.save(function(err){
                    /*if(err){throw err;}
                    passport.deserializeUser(function(id,done){
                        done(err, newUser);
                    });*/
                    res.send(user).end();
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