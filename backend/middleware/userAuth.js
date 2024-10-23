const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

const Auth = (req, res, next) => {
  const token = req.cookies.JWTtoken || null;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        req.user = await User.findById(decoded.id).select("-password");
        next();
      });
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = Auth;
