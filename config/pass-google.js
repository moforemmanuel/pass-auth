const authUserController = require('../controllers/authUserController');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = passport => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/users/auth/google/callback',
            passReqToCallback: true
        }, authUserController));
};