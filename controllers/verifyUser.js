const sendMail = require('../services/mail').sendMail;


module.exports.verifyUser = async (req, email) => {
    try {
        const otp = await sendMail(email).catch(err => {
            console.log(err);
            // res.status(500).json({
            //     msg: 'mail not sent',
            //     data: err
            // })
            console.log("Mail not sent");
            req.flash('error_msg', 'Mail not sent')
        });

        req.flash('otpCode', otp);
        // console.log("Generated: " + req.flash('otpCode'));
        global.otpCode = otp;

        // res.json({
        //     msg:"Mail sent",
        //     data: otp});
        req.flash('success_msg', 'Mail sent')
    } catch(err){
        console.log(err);
    }
    req.flash('userEmail', email)
    // console.log(req.flash());
}