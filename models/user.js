const { Schema, model } = require('mongoose');

//Schema to creatte user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }

);
userSchema.virtual("friendCount".length(function() {
    return this.friends.length;
}))

const User = model('user', userSchema);

module.exports = User;