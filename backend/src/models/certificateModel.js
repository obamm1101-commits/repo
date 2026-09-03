const db = require("../config/db");

const getAllCertificates = (callback) => {
  const sql = `
    SELECT
      id,
      title,
      issuer,
      date,
      credential_id,
      verification_url,
      created_at
    FROM certificates
    ORDER BY id ASC
  `;

  db.query(sql, callback);
};

module.exports = {
  getAllCertificates,
};