const   mongoose = require('mongoose');
const validator = require('validator');



const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            validate: [validator.isEmail, 'field must be a valid email']
        },
        password: {
            type: String,
            require: true
        },
        token: {
            type:String
        }
    }
);

module.exports = mongoose.model('User', userSchema);