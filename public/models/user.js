// Chargement Dépendances
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Définition du modèle de l'utilisateur dans la bdd //
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
});

// Fonction de génération d'un hash de sécurité //
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Fonction de vérification de la validité mot de passe hashé //
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Création de modèle de l'utilisateur //
module.exports = mongoose.model('User', userSchema);
