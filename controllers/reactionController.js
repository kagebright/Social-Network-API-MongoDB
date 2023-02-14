const Reaction = require('../models/Thought');

// POST reactions for a specific message
const getReaction = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const reactions = await Reaction.find({ message: messageId });
    res.status(200).json(reactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE reaction
const deleteReaction = async (req, res) => {
  try {
    const reactionId = req.params.reactionId;
    const reaction = await Reaction.findById(reactionId);
    if (!reaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    await Reaction.findByIdAndDelete(reactionId);
    res.status(200).json({ message: 'Reaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getReaction,
  deleteReaction
};
