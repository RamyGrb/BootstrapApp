// Ici on garde les clés secrètes de l'user //

module.exports = {

    'facebookAuth' : {
        'clientID'  : '417506675086423',
        'clientSecret' : '590626af3dbf975a880e06c45d57efb1',
        'callbackURL' : 'http://localhost:3000/auth/facebook/callback',
        'profileFields' : ["email", "displayName", "familyName", "givenName", "value"]
    },

    'googleAuth' : {
        'clientID' : 'clientID',
        'clientSecret' : 'client secret',
        'callbackURL' : 'adresse de callback'
    }
};