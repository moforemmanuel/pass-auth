const mongoose = require('mongoose');
let {v4: uuidv4} = require('uuid')

require('mongoose-uuid4')(mongoose);
const UUID = mongoose.Types.UUID;


const UserSchema = new mongoose.Schema({
    _id: {
        type: UUID,
        // required: true,
        default: () => uuidv4()

    },
    provider: {
        type: String,
        required: false,
        default: 'local'
        
    },

    providerID: {
        type: String,
        required: false,
        default: 'local'
        
    },

    userName: {
        type: String,
        required: true,
        
    },
    

    token: {
        type: String,
        // required: true,
        default: ''
    },

    email: {
        type: String,
        // required: true,
        default: ''
    },
    phone: {
        type: String,
        required: false,
        default: ''
    },

    gender: {
        type: String,
        // required: true,
        default: ''
    },

    picture: {
        type: String,
        // required: true,
        default: "https://scontent.fdla3-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c59.0.200.200a_dst-jpg_p200x200&_nc_cat=1&ccb=1-5&_nc_sid=12b3be&_nc_eui2=AeFVuzLZHQ6lAdVzvjOYCNNiik--Qfnh2B6KT75B-eHYHlABgCwhE90dD1qbSznWZYN7dmdQWs3rOJyva4C-paZQ&_nc_ohc=LiJALKgCTf4AX941xMJ&_nc_ht=scontent.fdla3-1.fna&edm=AP4hL3IEAAAA&oh=00_AT-IIVJosPpdDWSpGaC3TeWV7Q1zj_XLOmzsI_9t3oDF1Q&oe=62658619"
    },

    password: {
        type: String,
        // required: true,
        default: ''
    },

    isVerified: {
        type: Boolean,
        // required: true,
        default: false
    }
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;