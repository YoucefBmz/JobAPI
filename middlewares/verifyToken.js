const User = require("../Models/User");
const jwt = require("jsonwebtoken");

// 07.50.00 ...

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(500).send("not autherized!!! ...");
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // attach the user to the job routes

      req.user = { userId: payload.userId, username: payload.username };
      next();
    } catch (err) {}
  }
};

module.exports = auth;
