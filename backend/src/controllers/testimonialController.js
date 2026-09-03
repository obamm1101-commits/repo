const testimonialModel = require("../models/testimonialModel");

const getTestimonials = (req, res) => {
  testimonialModel.getAllTestimonials((err, results) => {
    if (err) {
      console.error("Get testimonials error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data testimonials",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

module.exports = {
  getTestimonials,
};