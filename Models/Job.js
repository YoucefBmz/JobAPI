const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "please provide company name "],
      //unique: true,
    },
    position: {
      type: String,
      required: [true, "please provide position name "],
      //unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "interview"],
      default: "pending",
      //unique: true,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", // atatch this property to the user model
      required: [true, "provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

/* 

{
  "company" : "google",
  "position": "front end" 
}


*/
