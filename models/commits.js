const mongoose = require('mongoose'); //Para manipular conexión y el manejo de la base de datos
                       

const { Schema } = mongoose; //Objeto Schema para realizar diferentes operaciones
const CommitSchema = new Schema({
    //atributos con sus validaciones
    commit: {type:String, required:true}, 
    username: {type:String, required:true},
});


module.exports = mongoose.model('commits', CommitSchema);
