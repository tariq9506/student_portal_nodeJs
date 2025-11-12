
const pool = require('../config/config')
const checkUserExixst = async (email) => {
  const query = `
    SELECT EXISTS(
        SELECT 1 FROM students WHERE email = $1
    ) AS "exist";
  `;
  try {
    const isExist = await pool.query(query, [email]);
    return isExist.rows[0].exist;
  } catch (err) {
    console.error('❌ DB error in checkUserExixst:', err.message);
    throw err; // This stops controller execution
  }
};
const createStudentModel = async(user) => {
    console.log(user)
    const { studentName, email, hashPass, phone } = user;

  const query = `
    INSERT INTO students (name, email, password, phone)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [studentName, email, hashPass, phone];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error inserting user:', err.message);
    throw err;
  }
}; 
module.exports = {createStudentModel,checkUserExixst}