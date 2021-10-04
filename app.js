const express = require("express");
const app = express();
require("dotenv").config();

// connexion ... :
require("./connexion.js");

const cors = require("cors");

// express json ... :
app.use(express.urlencoded({ extended: true })); // allow the server to recive json files
app.use(express.json());

app.use(cors());

// routes ...

const AuthUser = require("./Routes/AuthUser");
const JobsUser = require("./Routes/JobsUser");
const autherizedUser = require("./middlewares/verifyToken");
app.use("/api/auth", AuthUser);
app.use("/api/jobs", autherizedUser, JobsUser);

app.get("/", (req, res) => {
  res.send("welcome!");
});
// run the server ...
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server up & running in port ${port} `);
});

/*
https://www.youtube.com/watch?v=rltfdjcXjmk
https://www.youtube.com/watch?v=rltfdjcXjmk



*/
