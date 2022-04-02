const otpGenerator = require('otp-generator');
const OTP_LENGTH = process.env.OTP_LENGTH;
const OTP_CONFIG = process.env.OTP_CONFIG;

module.exports.generateOTP = () => {
    const otpCode = otpGenerator.generate(6, OTP_CONFIG);
    return otpCode;
}
