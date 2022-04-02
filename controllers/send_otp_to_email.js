const OTP_Model = require('../models/OTP');
const getOTP = require('./otpController').createOTP;
const sendMail = require('../services/mail').sendMail;

module.exports.send_otp_to_email = async (req, res, email) => {
    let OTP = getOTP(email);

    OTP_Model.findOne({code: OTP.code})
    .then(obj => {
        if (obj) {
            OTP_Model.deleteOne({code: OTP.code}, (err) => {
                if (err) console.log('could not delete OTP');
                console.log('Generated OTP deleted, in db');
            });

            OTP = getOTP(email);
        }
    }) 

    try {
        const info = await sendMail(email, OTP.code);
        console.log("Mail sent");


        if (info) req.flash('success_msg', 'Verification code resent');
        
    } catch(err){
        console.log("Mail not sent");
        console.log(err.code);
        console.log(err.message);
        // console.log(err);

        OTP_Model.deleteOne({code: OTP.code}, (err) => {
            if (err) console.log('could not delete OTP');
            console.log('Generated OTP deleted, error');
        });

        if (err.code == 'EENVELOPE') {
            req.flash('error_msg', 'Verification code not sent, no email found');
            
        }

        else if (err.code == 'ESOCKET') {
            req.flash('error_msg','Verification code not sent, no internet');
            
        }

        else if (err.code == 'EDNS') {
            req.flash('error_msg','Verification code not sent, server error');
            
        }

        else {
            req.flash('error_msg','Verification code not sent, please request a resend');
            
        }

        

    } finally {
        return res.render('verify');
    }
    
}