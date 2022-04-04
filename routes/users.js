const express = require('express');
const router = express.Router();
const passport = require('passport');

//inport controllers
const { userAuth } = require('../controllers/userAuth');
const verifyController = require('../controllers/verifyController').verifyController

//services
const send_otp_to_email = require('../controllers/send_otp_to_email').send_otp_to_email;

//strategies
// require('../config/pass-fb')(passport);
// require('../config/pass-local')(passport);
// require('../config/pass-google')(passport);


router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/register', (req, res, next) => {
    userAuth(req, res); 
    req.session.strategy = req.body.strategy;                
});


router.get('/verify-by-email', (req, res) => {
    const email = req.user ? req.user.email : req.session.email;
    send_otp_to_email(req, res, email);
    
});

router.post('/verify-by-email', async (req, res) => {
    verifyController(req, res);
    
});

router.post('/verify-resend', (req, res) => {
    const email = req.user ? req.user.email : req.session.email;
    send_otp_to_email(req, res, email);
})


// facebook auth
// router.get('/auth/facebook', passport.authenticate('facebook', {
//     scope: 'email'
// }));
router.get('/auth/facebook', (req, res, next) => {
    req.session.strategy = req.body.strategy;
    passport.authenticate('facebook', {scope: 'email'})(req, res, next);
});


//facebook auth callback
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

//google auth
router.get('/auth/google', (req, res, next) => {
    req.session.strategy = req.body.strategy;
    passport.authenticate('google', {scope: ['email', 'profile']})(req, res, next);
});

//google callback
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

//twiiter auth
router.get('/auth/twitter', (req, res, next) => {
    req.session.strategy = req.body.strategy;
    passport.authenticate('twitter', {scope: 'email'})(req, res, next);
});


//facebook auth callback
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureFlash: true,
        failureRedirect: '/users/login'
    })(req, res, next);
});

//logout handler
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})



module.exports = router