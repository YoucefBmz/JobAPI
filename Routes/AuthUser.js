const router = require("express").Router();

const AuthController = require("../Controllers/AuthController");

router.get("/", (req, res) => {
  res.send("enter user!");
});

// REGISTER :
router.post("/register", AuthController.registerUser);

// LOGIN :
router.post("/login", AuthController.loginUser);

module.exports = router;
