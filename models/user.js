const { Schema, model } = require('mongoose');

//Schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address']
        },
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            }
          ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    }

);

//virtual to retrieve the length of the users friends array field on query
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;