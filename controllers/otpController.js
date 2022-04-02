const otpGen = require('./otpCodeGen').generateOTP;
const OTP_Model = require('../models/OTP');



module.exports.createOTP = email => {
    const addMinutesToDate = (date, minutes) => {
        return new Date(date.getTime() + minutes*60000);
    }

    const create_at = new Date();
    const expire_at = addMinutesToDate(create_at, 30);
    let verified = false;
    let otpCode = otpGen();

    const newOTP = new OTP_Model({
        code: otpCode,
        email,
        create_at,
        expire_at,
        verified
    });

    newOTP.save()
        .then(otp => console.log(otp))
        .catch(err => console.log(err));

    return newOTP;
}