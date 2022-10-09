const { Router, request } = require('express');
const verifyToken = require('../config/userAuth.js');
const SummaryController = require('../controllers/summaryController.js');

const router = Router();

router
    // READ (SUMMARY)
    .get("/summary/:year([0-9]{4})/:month([0-9]{2})", verifyToken, SummaryController.summaryByMonth)

module.exports = router;