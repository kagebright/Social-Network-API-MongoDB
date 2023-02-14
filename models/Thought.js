const { Schema, model } = require('mongoose');

//Schema to create Thoughts model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: [
                (input) => input.length >= 1 && input.length <= 280,
                "Thought must be between 1 and 280 characters."
            ],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    }
);

//virtual to retrieve thew length of the thoughts reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;