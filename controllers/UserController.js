import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import Token from "../models/Token.js";

export const register = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        status: false,
        message: "Email already exists!",
      });
    } else {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const doc = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        avatarUrl: req.body.avatarUrl,
        passwordHash: hash,
      });

      const user = await doc.save();
      const token = jwt.sign({ _id: user._id }, "secretCode3228!-32fd", {
        expiresIn: "1h",
      });

      const { passwordHash, ...userData } = user._doc;
      res.json({
        ...userData,
        token,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't register user!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(403).json({
        success: false,
        status: false,
        message: "User not found!",
      });
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect login or password!",
      });
    }
    const token = jwt.sign({ _id: user._id }, "secretCode3228!-32fd", {
      expiresIn: "1h",
    });
    const expirationDate = new Date(Date.now() + 3600000);
    await Token.findOneAndUpdate(
      { _userId: user._id, tokenType: "login" },
      { token: token, expirationDate: expirationDate },
      { new: true, upsert: true }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
      expirationDate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't login user!",
    });
  }
};

export const logout = async (req, res) => {
  try {
    await Token.findOneAndDelete({ _userId: req.userId, tokenType: "login" });
    return res.status(200).json({
      status: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Can't logout user!",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,

      message: "Can't get user!",
    });
  }
};

export const update = async (req, res) => {
  try {
    const { fullName, email, avatarUrl, currentPassword, newPassword } =
      req.body;
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Check if the provided current password matches the stored password hash
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);

      if (!isMatch) {
        return res.status(403).json({
          success: false,
          message: "Incorrect current password!",
        });
      }

      // Generate a new password hash for the updated password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      user.passwordHash = hash;
    }

    // Update the user's information
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.avatarUrl = avatarUrl || user.avatarUrl;

    const updatedUser = await user.save();

    const { passwordHash, ...userData } = updatedUser._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Can't update user info!",
    });
  }
};
