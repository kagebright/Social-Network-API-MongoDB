const express = require("express");
const router = express.Router();

// Get all users
router.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get a single user by ID
router.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Create a new user
router.post("/users", (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({
    username,
    email,
  });
  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => {
      const message = getErrorMessage(err);
      return res.status(400).json({ error: message });
    });
});

// Update a user by ID
router.put("/users/:id", (req, res) => {
  const { username, email } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username,
        email,
      },
    },
    { new: true }
  )
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete a user by ID
router.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json({ success: true });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Add a friend to a user's friend list
router.post("/users/:id/friends", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { friends: req.body.friendId } },
    { new: true }
  )
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.json(user);
    })
    .catch((err) => res.status(500).json
    )});
