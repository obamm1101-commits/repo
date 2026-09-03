const db = require("../config/db");

const getAllSkills = (callback) => {
  const sql = `
    SELECT
      skills.id,
      skills.name,
      skills.level,
      skills.percentage,
      skill_groups.title AS group_title,
      skill_groups.icon AS group_icon
    FROM skills
    INNER JOIN skill_groups
      ON skills.group_id = skill_groups.id
    ORDER BY skill_groups.id, skills.id
  `;

  db.query(sql, callback);
};

module.exports = {
  getAllSkills,
};