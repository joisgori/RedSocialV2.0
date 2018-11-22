const mongoose = require('mongoose'); //Para manipular conexión y el manejo de la base de datos
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
                       

const { Schema } = mongoose; //Objeto Schema para realizar diferentes operaciones
const CommitSchema = new Schema({
    //atributos con sus validaciones
    commit: {type:String, required:true, unique:true}, 
    username: {type:String, required:true},
});


CommitSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
             return callback(err);
            }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result === true) {
                        return callback(null, user);
                    } else {
                        return callback(new Error('User or Password are wrong'));
                    }
                })
            });
    }

CommitSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
        return next(err);
        }
        user.password = hash;
        next();
    })
    });
let Commit = mongoose.model('commits', CommitSchema);


module.exports = Commit;
