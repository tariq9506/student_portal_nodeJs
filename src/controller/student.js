const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const{createStudentModel,
        checkUserExist,
        findStudents
} = require('../models/students')

const {
        validateEmail,
        validatePhone
} = require('../utility/util');
const { sendVerificationCode } = require("./otp");
const { PassThrough } = require("nodemailer/lib/xoauth2");

const createStudent = asyncHandler(async (req, res) => {
  const { studentName, email, phone, password } = req.body;

  if (!studentName || !email || !phone || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  };
  if(!validateEmail(email)){
    res.status(400);
    throw new Error("Invalid email address !");
    
  };
  if(!validatePhone(phone)){
    res.status(400);
    throw new Error("Invalid Phone Number !");
    
  };
  const studentExist = await checkUserExist(email); // stops here if DB error
  if (studentExist) {
    res.status(400);
    throw new Error("Student already exists with this email.");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const user = { studentName, email, hashPass, phone };
 try{
     const {otp, expires_at} = await sendVerificationCode(email);
      user.otp =otp;
      user.expires_at  =expires_at;

 }catch(err){
  throw new Error("Failed to send otp !",err.message);
  
 }
 
  const newUser = await createStudentModel(user);

  res.status(201).json({
    message: "Student created successfully 🚀",
    stuent_name: newUser.name,
    email: newUser.email,
    phone:newUser.phone,
    created_at:newUser.created_at
  });
});
 

const studentLogin = asyncHandler(async(req,res)=>{
  console.log(req.body)
    const {email,password} = req.body
    if (!email || !password){
        res.status(400);
        throw new Error("Missing Mendatory Field.");
    }
    if(!validateEmail(email)){
      res.status(400);
      throw new Error("Email address invalid !");
      
    };
    const student = await findStudents(email);
    console.log(student.password)
    if (student && (await bcrypt.compare(password,student.password))){
        const accessToken = jwt.sign({
            student: {
                username:student.studentName,
                email:student.email,
                id:student.id,
            }
      }, process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"1m"}
  );
            res.status(200).json(accessToken)
    }else{
        res.status(401)
        throw new Error("Authorization Failed, email or password invalid!");
    }
});

const getStudentDetails = asyncHandler(async(req,res)=>{
      const {email} = req.body;
      if (!email){
        res.status(404);
        throw new Error("Please enter your email address !");
      }
       if(!validateEmail(email)){
      res.status(400);
      throw new Error("Email address invalid !");
      
    };
      const student = await findStudents(email,0);
      if (!student){
        res.status(404);
        throw new Error("No record found with given email address.");
      }

    res.status(200).json({
      message:"Find student details.",
      student:student
    });
});



const updateStudentDetails = asyncHandler(async(req, res) => {
 
  const id = Number(req.params.id);
  
  if (!id || isNaN(id)){
    res.status(404);
    throw new Error("Student id must be valid number.");
  };
  const {studentName,phone} = req.body;
  let updateFiels = {};
  if (studentName !== undefined){

    res.status(404);
    throw new Error("Student name must be valid non empty string.");
    
  }
updateFiels.studentName  = studentName.trim();

  if (typeof phone != "string"){
    res.status(404);
    throw new Error("Phone no. must be valid.");
  };
  
  if ( phone.trim().length != 0){
    if(!validatePhone(phone)){
    res.status(400);
    throw new Error("phone no. is invalid.");
  }else{
      students = {phone};
  }};
  try{
    
  }catch(err){

  }
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
    deleteStudentById,
    studentLogin
};