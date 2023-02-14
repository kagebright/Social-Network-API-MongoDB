const { Thought } = require('../models');

const thoughts = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(data => res.json(data))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(data => {
        // If no thought is found, return 404
        if (!data) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create thought
  create({ body }, res) {
    Thought.create(body)
      .then(data => res.json(data))
      .catch(err => res.status(400).json(err));
  },

  // update thought by id
  update({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(data => {
        // If no thought is found, return 404
        if (!data) {
          res.status(404).json({ message: 'No thought found!' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(data => {
        // If no thought is found, return 404
        if (!data) {
          res.status(404).json({ message: 'No thought found!' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(400).json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(data => {
        // If no thought is found, return 404
        if (!data) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(data => res.json(data))
      .catch(err => res.json(err));
  }
};

module.exports = thoughts;
