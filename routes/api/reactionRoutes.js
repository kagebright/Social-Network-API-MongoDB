const router = require('express').Router();
const {
  getReaction,
  deleteReaction
} = require('../../controllers/reactioncontroller');

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(getReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
