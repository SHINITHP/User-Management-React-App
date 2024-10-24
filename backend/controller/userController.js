const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const Auth = require("../middleware/userAuth");

const MaxExpTime = 3 * 24 * 60 * 60; // expire in 3days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: MaxExpTime,
  });
};

router.post("/register", async (req, res) => {
  try {
    const { userName, mobile, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExist = await User.findOne({ email: email });
    console.log(isExist);
    if (isExist) {
      res.json({ success: false, message: "User Already Exist" });
    } else {
      const user = new User({
        userName,
        password: hashedPassword,
        email,
        mobile,
      });

      await user.save();
      res.json({ success: true, message: "User registered" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "User registered Failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    const user = {
      _id: isUserExist._id,
      email: isUserExist.email,
      userName: isUserExist.userName,
      mobile: isUserExist.mobile,
      isAdmin: isUserExist.isAdmin,
      profileImage: isUserExist.profileImage ? isUserExist.profileImage : null,
    };
    if (!isUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "User not Exist" });
    }

    if (user.isAdmin) {
      return res.status(403).json({ success: false, message: "You are not a regular user" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Password" });
    }
    const token = createToken(isUserExist._id);
    res.cookie("JWTtoken", token, { httpOnly: true }); //while we use httpOnly: true , this restrict the risk of client-side script attacks using any scripting languages
    res.json({
      success: true,
      token,
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
    console.log(error);
  }
});

router.put("/editProfile", async (req, res) => {
  try {
    console.log('hii',req.body)
    const { _id, email, mobile, userName, profileImage } = req.body;
    if (!_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id, 
      { userName, email, mobile, profileImage },
      { new: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {}
});

module.exports = router;
