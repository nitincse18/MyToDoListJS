const express = require("express");
const asyncWrapper = require("../utilities/async-wrapper").AsyncWrapper;
const archiver = require("../crons/archive-todos");

const router = express.Router();

router.post("/todos/archive", asyncWrapper(async (req, res) => {
    await archiver();
    res.sendStatus(200);
}));

module.exports = router;