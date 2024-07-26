import { hashPassword, generateToken } from "../middleware/user-config";
import User from "../models/User";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";

export const userAdd = async (req, res) => {
  try {
    const hashed = await hashPassword(req.body.password);
    const newUser = new User({
      personalInfo: {
        username: req.body.username,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        password: hashed,
      },
    });
    const savedUser = await newUser.save();
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.personalInfo.password;
    res.status(201).json({
      message: "User added successfully",
      data: userWithoutPassword,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
      status: "error",
    });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true, select: "-personalInfo.password" }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        status: "error",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
      status: "error",
    });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-personalInfo.password");
    res.status(200).json({
      message: "Users retrieved successfully",
      data: users,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: "error",
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId, "-personalInfo.password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        status: "error",
      });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
      status: "success",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Invalid user ID format",
        data: null,
        status: "error",
      });
    }
    res.status(500).json({
      message: error.message,
      data: null,
      status: "error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-personalInfo.password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null,
        status: "error",
      });
    }
    await user.deleteOne();
    res.status(200).json({
      message: "User deleted successfully",
      data: user,
      status: "success",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Invalid user ID format",
        data: null,
        status: "error",
      });
    }
    res.status(500).json({
      message: error.message,
      data: null,
      status: "error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ "personalInfo.email": email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        data: null,
        status: "error",
      });
    }
    const isMatch = await bcrypt.compare(password, user.personalInfo.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        data: null,
        status: "error",
      });
    }
    const token = await generateToken(email, user.personalInfo.password);

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.personalInfo.password;

    res.status(200).json({
      message: "Login successful",
      data: userWithoutPassword,
      status: "success",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred during login",
      error: error,
      status: "error",
    });
  }
};


export const GoogleAuthHandler = async (req, res) => {
  try {
    const {email,name}=req.body.user
    const user = await User.findOne({
      "personalInfo.email": email,
    });

    if (!user) {
      const hashed = await hashPassword("emailuserpassword@gemini");
      const newUser = new User({
        personalInfo: {
          username: name,
          email: password,
          password: hashed,
        },
      });
      const savedUser = await newUser.save();
      const userWithoutPassword = savedUser.toObject();
      delete userWithoutPassword.personalInfo.password;
      res.status(201).json({
        message: "User added successfully",
        data: userWithoutPassword,
        status: "success",
      });
    }
    const token = await generateToken(
      email,
      user.personalInfo.password
    );
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.personalInfo.password;
    return res.status(200).json({
      message: "Login successful",
      status: "success",
      token: token,
      data: userWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ error: error, status: "failed" });
  }
};
