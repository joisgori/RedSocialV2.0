const express = require('express');
const app = express();

const path = require('path');// modulo que permite manejar rutas
const mongoose = require('mongoose');//permite conectarse a mongodb
const passport = require('passport');// permite confugar la manera en la que me voy a autentificar en mi sistema
const flash = require('connect-flash');// 
const morgan = require('morgan');// manera en la cual definimos los metodos http que llegan al servidor
const cookieParser = require('cookie-parser');//permite Administrar las cookies
const bodyParser = require('body-parser');//convierte la informacion del navegador al servidor
const session = require('express-session');//

const { url } = require('./config/database.js');

mongoose.connect(url,{	useNewUrlParser: true})
				.then(()=>{console.log("conectado a mongo")}).catch(console.log);

var postingRoutes = require("./routes/posting");
var commitRoutes = require("./routes/commit");

var friendRouter = require('./routes/friend');
//var authenticate = require("./middlewares/AuthMiddleware");



require('./config/passport')(passport);
// settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.use(express.json());
//middeware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));


app.use(session({
	secret:"sesion", //variable del entorno o palabra secreta para nuestras sessiones
	resave:false,//para que no se guarde cada cierto tiempo
	saveUnitialized: false
}));

app.use(passport.initialize());//iniciar passport
app.use(passport.session());
app.use(flash());



/*app.use((req,res,next)=>{
	app.locals.name = 'luis';
	next();
});*/






//routes
require('./routes/routes')(app,passport);

//static files
app.use(express.static(path.join(__dirname,'public')));
//app.use(authenticate.isAuthentication);
app.use('/posting',postingRoutes);
app.use('/commit',commitRoutes);
app.use('/friend',friendRouter);
// start the server
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});
