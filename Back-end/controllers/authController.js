const User = require("../routes/authRoutes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  console.log("Body received for registration:", req.body);

  const { name, email, password: pass, class: kelas, school } = req.body;
  try {
    // cek user sudah ada
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
