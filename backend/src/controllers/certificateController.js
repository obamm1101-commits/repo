const certificateModel = require("../models/certificateModel");

const getCertificates = (req, res) => {
  certificateModel.getAllCertificates((err, results) => {
    if (err) {
      console.error("Get certificates error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data certificates",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  getCertificates,
};