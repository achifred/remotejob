const express = require("express");

const router = express.Router();

const {
	addJob,
	fetchJob,
	jobByUser,
	singleJob,
	updateJob,
	deleteJob
} = require("../controller/devjob");

router.post("/", addJob);
router.get("/", fetchJob);
router.get("/:id", jobByUser);
router.get("/single/:id", singleJob);
router.put("/updatejob", updateJob);
router.delete("/deletejob/:id", deleteJob);

module.exports = router;
