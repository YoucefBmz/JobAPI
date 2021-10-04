const User = require("../Models/User");
const bcrypt = require("bcrypt");

require("dotenv").config();

module.exports = {
  registerUser: async (req, res) => {
    try {
      console.log(req.body);
      // hash the password :
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // add new User :
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
      });
      // save the user :
      const user = await newUser.save();

      const token = user.createJWT();
      //res.header("auth-token", token).send(token);

      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // LOGIN ...

  loginUser: async (req, res) => {
    console.log(req);

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json("user not found");
      } else {
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          res.status(400).json("wrong password");
        } else {
          //res.status(200).json(user);
          const token = user.createJWT();
          res.status(200).json({ user, token });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
