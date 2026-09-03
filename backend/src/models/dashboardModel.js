const db = require("../config/db");

const getDashboardStats = (callback) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM projects) AS projects,
      (SELECT COUNT(*) FROM skills) AS skills,
      (SELECT COUNT(*) FROM certificates) AS certificates,
      (SELECT COUNT(*) FROM testimonials) AS testimonials,
      (SELECT COUNT(*) FROM contacts) AS contacts
  `;

  db.query(sql, callback);
};

const getLatestMessages = (callback) => {
  const sql = `
    SELECT id, name, email, message, created_at
    FROM contacts
    ORDER BY created_at DESC
    LIMIT 5
  `;

  db.query(sql, callback);
};

module.exports = {
  getDashboardStats,
  getLatestMessages,
};