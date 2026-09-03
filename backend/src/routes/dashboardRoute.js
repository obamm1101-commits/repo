const express = require("express");
const {
  getDashboardStats,
  getLatestMessages,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/messages", getLatestMessages);

module.exports = router;