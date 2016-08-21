module.exports = function(app, passport) {

    // Route de la page d'inscription à faire coté serveur //
    app.get('/signup', function(req, res) {
        res.render('signup.html');
    });

    // Inscription //
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/#/home',
        failureRedirect : '/#/signup'
    }));

    // Route de la page de connexion à faire coté serveur //    
    app.get('/login', function(req, res) {
        res.render('login.html');
    });

    // Connexion //
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/#/home',
        failureRedirect : '/#/login'
    }));

    // Rediriger vers le splash s'il n'y a pas de session active //
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }    
}