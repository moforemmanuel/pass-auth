const OTP_Model = require('../models/OTP');
const User = require('../models/User');

module.exports.updateUserStatus = async (otp_id, email, cb) => {
    // process.nextTick( () => {    
    // return new Promise( ( resolve, reject ) => {
        try {
            // console.log(userEmail);
            // model.updateOne({email: email}, {$set: {isVerified: true}}, (err, result) => {
            //     if (err) throw err;
            //     resolve(result);
                
            // });
            let updatedUser = await User.findOneAndUpdate({email:email}, {isVerified: true}, {new: true});
            updatedUser.save();
            

            let updatedOTP = await OTP_Model.findOneAndUpdate({_id:otp_id}, {verified: true}, {new: true});
            updatedOTP.save();

            // OTP_Model.updateOne({_id: id}, {$set: {verified: true}}, (err, result) => {
            //     if (err) throw err;
            // });

            // req.user.isVerified = true;

            cb();

        } catch (err) {
            // reject(err);
            console.log(err);
        }

        


    // });
    // });
}
