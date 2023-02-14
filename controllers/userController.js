const User = require('../models/User');

// function for getting all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts friends');
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
};

//function for creating a new user
const createNewUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// function for updating a user
const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//function for deleting a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//function for adding a friend to a user's friend list
const addFriend = async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findById(userId);
      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json();
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

//function for removing a friend from a user's friend list
const removeFriend = async (req, res) => {
    try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    if (user.friends.includes(friendId)) {
    user.friends.pull(friendId);
    await user.save();
    res.status(200).json(user);
    } else {
    res.status(404).json({ message: 'Friend not found' });
    }
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
    };

module.exports = {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};