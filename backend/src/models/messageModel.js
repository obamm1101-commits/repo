const db = require("../config/db");

const getAllMessages = (callback) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      message,
      created_at
    FROM contacts
    ORDER BY created_at DESC
  `;

  db.query(sql, callback);
};

const createMessage = (data, callback) => {
  const sql = `
    INSERT INTO contacts (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [data.name, data.email, data.message],
    callback
  );
};

module.exports = {
  getAllMessages,
  createMessage,
};