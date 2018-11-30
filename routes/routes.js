var express = require('express');
var router = express.Router();
var commitController = require('../controller/postingControler');
//const AuthMiddleware = require("../middlewares/AuthMiddleware");


module.exports = (app, passport) =>{
    //Index
    app.get('/', (req,res) =>{
        res.render('Index');
    });
    //Login
    app.get('/Formulario', (req,res) =>{
        res.render('Formulario', {
            message : req.flash('loginMessage')
        });
    }); 
    //Para cuando quiera Inscribirse el usuario
    app.post('/Formulario', passport.authenticate(''));
    //Principal
    
    

    app.post('/signup', passport.authenticate('local-signup', {
       successRedirect:'/principal',
        failureRedirect: '/Formulario',
        passReqToCallback: true,
        failureFlash: true

    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect:'/principal',
         failureRedirect: '/',
         passReqToCallback: true,
         failureFlash: true
 
     }));
     app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/principal', (req,res)=>{
        res.render("principal");    });
        app.get('/user', function(req, res){
            res.send(req.user);
        });
    
     app.get('/principal', passport.authenticate('local-login', {
        successRedirect:'/principal',
         failureRedirect: '/',
         passReqToCallback: true,
         failureFlash: true
 
     }));
    

    
    //app.get('/posting/', commitController.getAll);

//app.get('/posting/:username', commitController.getAllPostingsOne);

// Create
//app.post('/posting/', commitController.insert);

// UPDATE
//app.put('/posting/:id',commitController.update);

// Delete
//app.delete('/posting/:id',commitController.delete);


};