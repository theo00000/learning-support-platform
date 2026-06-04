const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Authorization token is required",
    });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({
      msg: "Authorization token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (_err) {
    return res.status(401).json({
      msg: "Authorization token is invalid or expired",
    });
  }
};
