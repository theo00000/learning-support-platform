const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const passwordRequirementMessage =
  "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";

const normalizeEmail = (email = "") => String(email).toLowerCase().trim();

const isValidEmail = (email = "") => emailRegex.test(normalizeEmail(email));

const isStrongPassword = (password = "") =>
  strongPasswordRegex.test(String(password));

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

    const trimmedName = String(name || "").trim();
    const normalizedEmail = normalizeEmail(email);
    const trimmedGrade = String(grade || "").trim();
    const trimmedSchool = String(school || "").trim();

    if (
      !trimmedName ||
      !normalizedEmail ||
      !password ||
      !trimmedGrade ||
      !trimmedSchool
    ) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({
        msg: "Invalid email format",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        msg: passwordRequirementMessage,
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        msg: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      grade: trimmedGrade,
      school: trimmedSchool,
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

    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password || !isValidEmail(normalizedEmail)) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        msg: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
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
