//const router = require("express");

const router = require("express").Router();
const JobsController = require("../Controllers/JobsController");
const JobController = require("../Controllers/JobsController");

// create job
router.post("/", JobsController.createJob);

// get all jobs ...
router.get("/", JobsController.getJobs);

// get one job ...
router.get("/:id", JobsController.getOneJob);

// update job ...
router.patch("/:id", JobsController.updateJob);

// delete ...
router.delete("/:id", JobsController.deleteJob);

module.exports = router;
