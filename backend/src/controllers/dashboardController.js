const dashboardModel = require("../models/dashboardModel");

const getDashboardStats = (req, res) => {
  dashboardModel.getDashboardStats((err, results) => {
    if (err) {
      console.error("Dashboard stats error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil statistik dashboard",
      });
    }

    res.json({
      success: true,
      data: results[0],
    });
  });
};

const getLatestMessages = (req, res) => {
  dashboardModel.getLatestMessages((err, results) => {
    if (err) {
      console.error("Messages error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil pesan terbaru",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  getDashboardStats,
  getLatestMessages,
};