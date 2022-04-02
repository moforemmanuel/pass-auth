const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res) => {
    res.render('welcome')
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    });
    // console.log('req.user ', req.user);
    // console.log('req.pass ', req.passport);
    // console.log('user data ', req.user )
});

router.get('/store', ensureAuthenticated, (req, res) => {
    res.render('store', {
        user: req.user
    });
})




module.exports = router;