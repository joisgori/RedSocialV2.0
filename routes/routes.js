var express = require('express');
var router = express.Router();
var commitController = require('../controller/postingControler');


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
    app.get('/principal', (req,res) =>{
        res.render('principal');
    }); 

    app.post('/signup', passport.authenticate('local-signup', {
       successRedirect:'/profile',
        failureRedirect: '/Formulario',
        passReqToCallback: true,
        failureFlash: true

    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect:'/profile',
         failureRedirect: '/',
         passReqToCallback: true,
         failureFlash: true
 
     }));
    app.get('/profile', (req,res)=>{
        res.render("principal");    });

        app.get('/user', function(req, res){
            res.send(req.user);
          })
    //app.get('/posting/', commitController.getAll);

//app.get('/posting/:username', commitController.getAllPostingsOne);

// Create
//app.post('/posting/', commitController.insert);

// UPDATE
//app.put('/posting/:id',commitController.update);

// Delete
//app.delete('/posting/:id',commitController.delete);

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
};