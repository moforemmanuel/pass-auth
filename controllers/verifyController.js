const OTP_Model = require('../models/OTP');
const User = require('../models/User');
const { updateUserStatus } = require('../controllers/updateUserStatus');
// const FBUser = require('../models/FBUser');

module.exports.verifyController = async (req, res) => {
    const currentTimeString = Date(Date.now());
    // const strategy = 'local';
    // console.log(req.body);
    const otpEntered = req.body.otp;
    const userEmail = req.user ? req.user.email : req.session.email

    OTP_Model.findOne({code: otpEntered})
        .then(otp_obj => {
            if (!otp_obj) {
                console.log('Invalid OTP');
                req.flash('error_msg', 'Invalid OTP entered');
                res.redirect('/users/verify-by-email');
            }   

            if (otp_obj.email != userEmail) {
                console.log('Incorrect OTP');
                req.flash('error_msg', 'Incorrect OTP entered');
                res.redirect('/users/verify-by-email');
            }

            const expireTime = new Date(otp_obj.expire_at);
            const currentTime = new Date(currentTimeString);

            // console.log(currentTime, typeof currentTime);
            // console.log(expireTime, typeof expireTime);

            // let model;
            // switch (strategy) {
            //     case 'local':
            //         model = User;
            //         break;

            //     case 'facebook':
            //         model = FBUser;
            //          break;
            // }

            if (currentTime.getTime() <= expireTime.getTime()) {
                updateUserStatus(otp_obj._id, userEmail, () => {
                    if (req.session.passport){
                        req.session.passport.user.isVerified = true;
                    }
                        if (req.session.strategy == 'local') {
                            req.flash('success_msg', 'You are verified and can now log in')
                            res.redirect('/users/login')
                        } else {
                            res.redirect('/dashboard');
                        }
                    });
                


            } else {
                req.flash('error_msg', 'OTP expired');
                res.redirect('/users/verify-by-email');
            }

        

            
        })
        .catch(err => {
            console.log(err);

        });
}