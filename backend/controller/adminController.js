const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminAuth = require('../middleware/adminAuth')
const MaxExpTime = 3 * 24 * 60 * 60; // expire in 3days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: MaxExpTime,
  });
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isAdminExist = await User.findOne({ email: email });
    if (!isAdminExist) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    if (!isAdminExist.isAdmin) {
      return res
        .status(403)
        .json({ success: false, message: "You are not an admin" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isAdminExist.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(isAdminExist._id);

    res.cookie("JWTtoken", token);

    const admininfo = {
      _id: isAdminExist._id,
      userName: isAdminExist.userName,
      email: isAdminExist.email,
      isAdmin: isAdminExist.isAdmin,
    };

    return res.json({
      success: true,
      token,
      message: "Login successful",
      admin: admininfo,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
});

router.get("/users",adminAuth, async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const query = {
      isAdmin: false,
      $or: [
        { userName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const users = await User.find(query).select("-password");
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.put("/users/:id", adminAuth , async (req, res) => {
  const userId = req.params.id;
  const { userName, email, mobile } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userName, email, mobile },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/users/:id", adminAuth , async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted successfull");
  } catch (error) {
    console.log(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    const { userName, email, mobile, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user", error });
  }
});

module.exports = router;
