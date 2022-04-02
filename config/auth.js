module.exports = {
    ensureAuthenticated: async (req, res, next) => {
        if (req.isAuthenticated() ){
            if (!req.user.isVerified) {
                req.flash('error_msg', 'Email not verified, check for otp in mailbox');
                console.log('User not verified');
                // console.log(req.session.passport.user);
                // req.session.email = req.user.email;
                res.redirect('/users/verify-by-email');
                // res.render('verify');
            } else {
                return next();
            }
        }

        
        else {
        req.flash('error_msg', 'Please Log in to view this page');
        res.redirect('/users/login');
        }
    }
}