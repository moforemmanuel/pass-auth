const nodemailer = require('nodemailer');
// const OTP = require('./otp').generateOTP();
// console.log(OTP);

module.exports.sendMail = async (toMail, otp) => {
    
    const fromMail = process.env.MAIL_EMAIL;
    const mailPass = process.env.MAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.cm",
        port: 465,
        secure: true,
        service: 'Gmail',

        auth: {
            user: fromMail,
            pass: mailPass,
        }
    });

    let info = await transporter.sendMail({
        from: '"Manuel" <moforemmanuel01@gmail.com>',
        to: toMail,
        subject: 'Email Verification',
        html: `
        <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
            <h2>Welcome to the club.</h2>
            <h4>You are officially In ✔</h4>
            <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to continue</p>
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
        </div>`
    });

    return info;

        
  

    

    // return OTP;


}