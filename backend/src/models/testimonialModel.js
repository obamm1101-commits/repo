const db = require("../config/db");

const getAllTestimonials = (callback) => {
  const sql = `
    SELECT
      id,
      name,
      role,
      company,
      avatar,
      stars,
      quote,
      created_at
    FROM testimonials
    ORDER BY id ASC
  `;

  db.query(sql, callback);
};

module.exports = {
  getAllTestimonials,
};