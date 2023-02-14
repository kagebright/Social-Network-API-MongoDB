const router = require('express').Router();
const {
    getAllThoughts,
    getById,
    create,
    update,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

//api/thoughts
router.route('/').get(getAllThoughts).post(create);

// /api/thoughts/:id
router.route('/:id').get(getById).put(update).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;