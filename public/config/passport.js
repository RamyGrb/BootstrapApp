// Chargement dépendances //
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var configAuth = require('./auth')

module.exports = function(passport) {

    // Garder une session active //
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Retirer une session active //
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    /////////////// LOCAL INSCRIPTION //////////////////
    
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },                                              
    function(req, email, password, done) {
        // Ligne nécessaire pour faire marcher la vérification avant d'inscrire l'user dans la bdd et pas après //
        process.nextTick(function() {

            // Vérification qu'un utilisateur avec ce mail n'existe pas déjà //
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // Retourner une erreur en cas d'erreur //
                if (err) return done(err);

                // Retourner un message si l'utilisateur existe déjà //
                if (user) return done(null, false);
                
                // Sinon création du nouvel utilisateur //
                else {
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        // Retourner une erreur en cas d'erreur //
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });    
        });
    }));
    
    /////////////// LOCAL CONNEXION //////////////////
    
    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
        
            // Vérification de l'adresse mail //
            User.findOne({ 'local.email' :  email }, function(err, user) {
                
                // Retourner une erreur en cas d'erreur //
                if (err)
                    return done(err);

                // Retourner un message si l'email n'est pas trouvé //
                if (!user)
                    return done(null, false);

                // Vérification du mot de passe //
                if (!user.validPassword(password))
                    return done(null, false);
                
                // Si tout est OK, retourner l'utilisateur //
                return done(null, user);
            });
        }));
    
    /////////////// FACEBOOK INSCRIPTION/CONNEXION //////////////////
    
    passport.use(new FacebookStrategy({
        clientID : configAuth.facebookAuth.clientID,
        clientSecret : configAuth.facebookAuth.clientSecret,
        callbackURL : configAuth.facebookAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
        // Ligne nécessaire pour faire marcher la vérification avant d'inscrire l'user dans la bdd et pas après //
        process.nextTick(function() {
            
            // Vérification qu'un utilisateur avec ce token n'existe pas déjà //
            User.findOne({ 'facebook.id' :  profile.id }, function(err, user) {
                // Retourner une erreur en cas d'erreur //
                if (err) return done(err);

                // Si l'utilisateur est trouvé, le connecter //
                if (user) return done(null, user);
                
                // Sinon création du nouvel utilisateur //
                else {
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.displayName;
                    newUser.facebook.separatedname = profile.name;
                    newUser.facebook.givenName = profile.givenName;
                    newUser.facebook.familyName = profile.familyName;  
                    newUser.facebook.email = profile.emails;

                    newUser.save(function(err) {
                        // Retourner une erreur en cas d'erreur //
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });             
        })
    }));
};