const mongoose =  require('mongoose');

const FBUserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    givenName: {
        type: String,
        required: false
    },
    familyName: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    pic: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }
});

const FBUser = mongoose.model('FBUser', FBUserSchema, 'FBUsers');
module.exports = FBUser;
