const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const{createStudentModel,
        checkUserExixst
} = require('../models/students')


const createStudent = asyncHandler(async (req, res) => {
  const { studentName, email, phone, password } = req.body;

  if (!studentName || !email || !phone || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const studentExist = await checkUserExixst(email); // stops here if DB error
  if (studentExist) {
    res.status(400);
    throw new Error("Student already exists with this email.");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const user = { studentName, email, hashPass, phone };
  const newUser = await createStudentModel(user);

  res.status(201).json({
    message: "Student created successfully 🚀",
    user: newUser,
  });
});
 



const getStudentDetails = asyncHandler(async(req,res)=>{
    res.status(200).json({message:"Get student details"});
});



const updateStudentDetails = asyncHandler(async(req, res) => {
  console.log('PUT / hit!'); // <- this will print on every browser hit
  res.status(200).json({message:'Student Portal API is running 🚀. Student details updated successfully.'});
});



const deleteStudentById =  asyncHandler(async(req, res) => {
  console.log('DELETE / hit!'); // <- this will print on every browser hit
res.status(200).json({message:'Student Portal API is running 🚀,Student delete successfully'});
});




module.exports={
    getStudentDetails, 
    createStudent,
    updateStudentDetails,
    deleteStudentById
};