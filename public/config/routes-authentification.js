module.exports = function(app, passport) {
    
    // Rediriger vers le splash s'il n'y a pas de session active //
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }    
    
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

    // Déconnexion //
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    /////////////// FACEBOOK PREMIERE CONNEXION //////////////////
    
    // Connexion //
     app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // Callback d'authentification //
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/home#/account',
            failureRedirect : '/#/login'
        }));
    
    /////////////// LIER LES COMPTES //////////////////
    
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.html');
    });
    
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect : '/home#/account',
        failureRedirect : '/connect/local'
    }));

    // Connexion à l'autorisation facebook //
    app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

    // Renvoyer un callback après l'autorisation de facebook //
    app.get('/connect/facebook/callback', passport.authorize('facebook', {
       successRedirect : '/home#/account',
       failureRedirect : '/#/login'
    }));
    
    /////////////// DELIER LES COMPTES //////////////////    

    // Déliaison local //
    app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/home#/account');
        });
    });

    // Déliaison facebook //
    app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.facebook.id = undefined;
        user.facebook.name = undefined;
        user.save(function(err) {
            res.redirect('/home#/account');
        });
    });    
};