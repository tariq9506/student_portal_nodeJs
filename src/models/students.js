
const {pool} = require('../config/config')
const checkUserExist = async (email) => {
  const query = `
    SELECT EXISTS(
        SELECT 1 FROM students WHERE email = $1
    ) AS "exist";
  `;
  try {
    const isExist = await pool.query(query, [email]);
    return isExist.rows[0].exist;
  } catch (err) {
    console.error('❌ DB error in checkUserExist:', err.message);
    throw err; // This stops controller execution
  }
};
const createStudentModel = async(student) => {
    console.log(student)
    const { studentName, email, hashPass, phone,otp,expires_at } = student;

  const query = `
    INSERT INTO students (
    name, 
    email, 
    password, 
    phone,
    otp,
    otp_expires_at,
    otp_created_at ,
    created_at
    )
    VALUES ($1, $2, $3, $4,$5,$6,NOW(),NOW())
    RETURNING *;
  `;
  const values = [studentName, email, hashPass, phone,otp,expires_at];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('❌ Error inserting user:', err.message);
    throw err;
  }
}; 
const findStudents = async(email) =>{
    console.log(email);
    const query = `SELECT id,name,password FROM students WHERE email = $1;`;
    console.log(query)
    try{
        const result  = await pool.query(query,[email]);
        console.log(result.rows[0]);
        if (result.rows.length===0){
            return null;
        }
            return result.rows[0];
    }catch(err){
            console.log("error while querying from database to fetch student details", err.message);
            throw new Error("Database query failed while selecting student details.");
            
    }

};
module.exports = {createStudentModel,checkUserExist,findStudents}