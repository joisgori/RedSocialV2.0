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
        res.render("principal");
    });
};