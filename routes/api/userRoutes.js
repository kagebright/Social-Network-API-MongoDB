const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

const User = require('../../models/User');

// Route for getting all users
router.get('/users', getAllUsers);

// Route for getting a single user by id
router.get('/users/:id', getSingleUser);

// Route for creating a new user
router.post('/users', createNewUser);

// Route for updating a user
router.put('/users/:id', updateUser);

// Route for deleting a user
router.delete('/users/:id', deleteUser);

// Route for adding a friend to a user's friend list
router.post('/users/:userId/friends/:friendId', addFriend);

// Route for removing a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', removeFriend);

module.exports = router;
