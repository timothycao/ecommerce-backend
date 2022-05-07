const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: async email => !await User.findOne({ email }),
            message: 'Email already used'
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports.userSchema = userSchema;
module.exports.User = User;