const User = require("../models/User"); // Adjust the path as needed

export const userAdd = async (req, res) => {
  try {
    const newUser = new User({
      personalInfo: {
        username: req.body.username,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
      },
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    // Find the user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {}
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: error.message });
  }
};