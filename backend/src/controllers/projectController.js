const projectModel = require("../models/projectModel");

const getProjects = (req, res) => {
  projectModel.getAllProjects((err, results) => {
    if (err) {
      console.error("Get projects error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil data projects",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

const getProject = (req, res) => {
  projectModel.getProjectById(req.params.id, (err, results) => {
    if (err) {
      console.error("Get project error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil project",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: results[0],
    });
  });
};

module.exports = {
  getProjects,
  getProject,
};