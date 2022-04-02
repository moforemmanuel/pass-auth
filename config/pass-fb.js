
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const authUserController = require('../controllers/authUserController');


module.exports = passport => {

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID, 
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        passReqToCallback: true,
        callbackURL: 'http://localhost:5000/users/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)', 'email']
    },

    //aapp config
    authUserController));

    // passport.serializeUser( (user, done ) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser( (id, done) => {
    //     FBUser.findById(id, (err, user) => {
    //         console.log(user);
    //         done(err, user);
    //     });
    // });
}