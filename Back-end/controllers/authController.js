const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  grade: user.grade,
  school: user.school,
  role: user.role,
});

const signToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "JWT_SECRET is missing. Create Back-end/.env based on .env.example",
    );
  }

  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "1d" },
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, grade, school } = req.body;

    if (!name || !email || !password || !grade || !school) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        msg: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      grade,
      school: school.trim(),
    });

    const token = signToken(user);

    return res.status(201).json({
      msg: "Register success",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        msg: "Email already registered",
      });
    }

    console.error("Register error:", err.message);

    return res.status(500).json({
      msg: "Server error while registering user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid email or password",
      });
    }

    const token = signToken(user);

    return res.json({
      msg: "Login success",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("Login error:", err.message);

    return res.status(500).json({
      msg: "Server error while logging in",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    return res.json({
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("Get profile error:", err.message);

    return res.status(500).json({
      msg: "Server error while fetching profile",
    });
  }
};
