const db = require("../config/db");

const getAllProjects = (callback) => {
  const sql = `
    SELECT
      id,
      title,
      category,
      description,
      tech,
      demo_url,
      github_url,
      image,
      created_at
    FROM projects
    ORDER BY created_at DESC
  `;

  db.query(sql, callback);
};

const getProjectById = (id, callback) => {
  const sql = `
    SELECT
      id,
      title,
      category,
      description,
      tech,
      demo_url,
      github_url,
      image,
      created_at
    FROM projects
    WHERE id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  getAllProjects,
  getProjectById,
};