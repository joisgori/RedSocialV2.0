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
      /*  res.render('profile',{
        user: req.user
        });*/
<<<<<<< HEAD
        res.render("principal");    });

    //app.get('/posting/', commitController.getAll);

//app.get('/posting/:username', commitController.getAllPostingsOne);

// Create
//app.post('/posting/', commitController.insert);

// UPDATE
//app.put('/posting/:id',commitController.update);

// Delete
//app.delete('/posting/:id',commitController.delete);
=======
        res.render("principal");
    });

    app.get('/', commitController.getAll);

app.get('/:username', commitController.getAllPostingsOne);

// Create
app.post('/', commitController.insert);

// UPDATE
app.put('/:id',commitController.update);

// Delete
app.delete('/:id',commitController.delete);
>>>>>>> adaa4e922ecda3dc017b7019bcc5a6b6426f7894
};