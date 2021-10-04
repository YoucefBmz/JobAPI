const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      //unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      //unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET
    /*{
      expiresIn: process.env.JWT_LIFETIME,
    }*/
  );
};

module.exports = mongoose.model("User", userSchema);

/* 
{
    "username": "qqqa",
    "gender": "men",
    "email": "yqaaoqa@gmail.com",
    "password": "123"
}
*/
