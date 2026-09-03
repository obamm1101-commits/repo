const skillModel = require("../models/skillModel");

const getSkills = (req, res) => {
  skillModel.getAllSkills((err, results) => {
    if (err) {
      console.error("Get skills error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data skills",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  getSkills,
};