const { pool } = require("../config/config");

const verifyOTP = async()=>{
     const query = `
      SELECT * FROM students
      WHERE email = $1
      ORDER BY created_at DESC LIMIT 1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
}

module.exports = {
                verifyOTP
}