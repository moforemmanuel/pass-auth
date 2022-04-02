const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        default: undefined
    },
    
    create_at: {
        type: Date,
        required: true,
        default: Date.now()
    },

    expire_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    email: {
        type: String,
        required: true,
    },

    verified: {
        type: Boolean,
        required: true,
        default: false
    }
});

const OTP_Model = mongoose.model('OTP', OtpSchema, 'otp');

module.exports = OTP_Model;