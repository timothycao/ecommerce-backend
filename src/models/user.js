const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.methods.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports.userSchema = userSchema;
module.exports.User = User;