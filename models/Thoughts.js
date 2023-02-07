const { Schema, model } = require('mongoose');

//Schema to create Thoughts model
const thoughtSchema = new Schema(
    {

    }
)

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;