module.exports = function(app, passport) {
    
    /////////////// LOCAL CONNEXION //////////////////    

    // Route de la page d'inscription à faire coté serveur //
    app.get('/signup', function(req, res) {
        res.render('signup.html');
    });
    
    // Inscription //
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home',
        failureRedirect : '/#/signup'
    }));

    // Route de la page de connexion à faire coté serveur //    
    app.get('/login', function(req, res) {
        res.render('login.html');
    });

    // Connexion //
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home',
        failureRedirect : '/#/login'
    }));
    
    // Accueil connecté //
    app.get('/home', isLoggedIn, function(req,res) {
        res.render('home.html', {
        });
    });
    
    // Récupérer les données de l'utilisateur du cookie //
    app.get('/api/user_data', function(req, res) {
        res.json({user: req.user});
    });   
    
    // Rediriger vers le splash s'il n'y a pas de session active //
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    // Déconnexion //
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /////////////// FACEBOOK CONNEXION //////////////////
    
    // Connexion //
     app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // Callback d'authentification //
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/home',
            failureRedirect : '/#/login'
        }));
};