const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { error } = require("console");

// generate web token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//register user
exports.registerUser = async (req, res) => {
  const { fullname, password, email, profileImageUrl } = req.body;

  if (!fullname || !password || !email) {
    return res.status(400).json({ message: "All feilds are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(400)
        .json({ message: "Provided email is already in use" });

    const user = await User.create({
      fullname,
      email,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(500).json({ message: "Error registering the user", e });
  }
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (e) {
    res.status(500).json({ message: "Error logging user", error: e.message });
  }
};

//getInfo
exports.getUserInfo = async (req, res) => {
  console.log("getUserInfo function running...");
  console.log("Request user:", req.user);

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }

    console.log("User found:", user);
    res.status(200).json(user);
  } catch (e) {
    console.error("Error fetching user:", e.message);
    res.status(500).json({ message: "Error logging user", error: e.message });
  }
};

console.log(typeof this.getUserInfo);
