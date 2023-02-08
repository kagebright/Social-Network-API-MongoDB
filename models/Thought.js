const { Schema, model } = require('mongoose');

//Schema to create Thoughts model
const thoughtSchema = new Schema(
    {
        thougts: {
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
        },
    }
);

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;