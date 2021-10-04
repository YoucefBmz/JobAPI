const User = require("../Models/User");
const bcrypt = require("bcrypt");
const Job = require("../Models/Job");

require("dotenv").config();

module.exports = {
  // get all jobs ...
  getJobs: async (req, res) => {
    const job = await Job.find({ createdBy: req.user.userId }).sort(
      "createdAt"
    );
    res.status(200).send(job);
  },

  // create job ...
  createJob: async (req, res) => {
    req.body.createdBy = req.user.userId;
    try {
      const jobs = await Job.create(req.body);
      res.status(200).send(jobs);
      // save job
    } catch (err) {}
  },
  // ...

  // get one job ...
  getOneJob: async (req, res) => {
    const job = await Job.findById({
      _id: req.params.id,
      createdB: req.user.userId,
    });
    if (!job) {
      res.status(404).send("job not found ...");
    } else {
      res.status(200).send(job);
    }
  },

  // update job ...

  updateJob: async (req, res) => {
    const userId = req.user.userId;
    const jobId = req.params.id;
    const { company, position } = req.body;

    if (company === "" || position === "") {
      res.status(500).send("fields are ampty ...");
    } else {
      const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!job) {
        res.status(404).send("job not found ...");
      } else {
        res.send(job);
      }
    }

    //
  },

  //  delete job
  deleteJob: async (req, res) => {
    const {
      user: { userId }, // const {userId} = req.user
      params: { id: jobId }, // const {id} = req.params
    } = req;

    const job = await Job.findOneAndRemove({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      res.status(404).send("job not found to remove ...");
    } else {
      res.status(200).send("job deleted !!");
    }
  },
};
