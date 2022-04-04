const authUserController = require('../controllers/authUserController');

const TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();

module.exports = passport => {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_KEY_SECRET,
        userProfileURL  : 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
        callbackURL: 'http://localhost:5000/users/auth/twitter/callback'
    }, authUserController));
}