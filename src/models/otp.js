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
const markStudentVerified = async (email) => {
  const query = `
    UPDATE students
    SET is_verify = $1
    WHERE email = $2
  `;

  try {
    const result = await pool.query(query, [true, email]);

    if (result.rowCount === 0) {
      throw new Error("No student found to verify.");
    }

    return true;

  } catch (err) {
    throw new Error("markStudentVerified: " + err.message);
  }
};
const saveResendOTP =async (otp,email,expires_at)=>{

  const query = `
                UPDATE students
                SET otp=$1,
                      otp_expires_at=$2,
                      otp_created_at = NOW()
                WHERE
                    email = $3;`;
    try {
    const result = await pool.query(query, [otp, expires_at,email]);

    if (result.rowCount === 0) {
      throw new Error("No student found to update otp details.");
    }

    return true;

  } catch (err) {
    throw new Error("saveResendOTP: " + err.message);
  }
};

module.exports = {
                verifyOTP,
                markStudentVerified,
                saveResendOTP
}