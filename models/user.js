const { Schema, model } = require('mongoose');

//Schema to creatte user model
const userSchema = new Schema(
    {

    }
)

const User = model('user', userSchema);

module.exports = User;