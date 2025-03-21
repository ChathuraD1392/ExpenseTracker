const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token); // Log token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded); // Log decoded token info
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found, invalid token" });
    }

    next();
  } catch (e) {
    console.error("Error verifying token:", e); // Log error
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
