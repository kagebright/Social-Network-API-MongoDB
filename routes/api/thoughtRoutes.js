const router = require('express').Router();
const {
    get

} = require('../../controllers/thoughtsController');

//api/thoughts
router.route('/').get()