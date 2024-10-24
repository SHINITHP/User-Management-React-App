const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
require("dotenv").config();

const adminAuth = (req, res, next) => {
  const token = req.cookies.JWTtoken;

//   console.log('token :',token,req.cookies)

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        const isAdmin = await User.findOne({
          _id: decoded.id,
          isAdmin: true,
        }).select("-password");

        if (!isAdmin) {
          return res.status(404).json({ message: "User not found" });
        }

        next();
      });
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = adminAuth;
