const expressAsyncHandler = require("express-async-handler");
const { markStudentVerified } = require("../models/otp");
const { sendOtp } = require("../utility/sendEmail");
const { generateOTP, otpExpireIn, validateEmail } = require("../utility/util");
const { findStudents } = require("../models/students");

const sendVerificationCode = async(email)=>{
    if (!email){
        throw new Error("email not found !");        
    }
    const otp = generateOTP();
    console.log(otp);
    const expires_at = otpExpireIn();
    console.log(expires_at);
    
    try {
    await sendOtp(email, otp);
} catch (err) {
    console.error("OTP send error:", err);
    throw new Error("Unable to send OTP. Please try again later.");
}
    return {otp,expires_at};
};
const verifyOtp = expressAsyncHandler(async(req,res)=>{
    const {email,code} = req.body;
    if (!email || !code){
        res.status(404);
        throw new Error("Email address or code missing !");        
    };
    if(!validateEmail(email)){
        res.status(400);
        throw new Error("Invalid email address !");
    };
    let student;

    try {
        student = await findStudents(email);

        if (!student) {
            res.status(404);
            throw new Error("Student does not exist.");
        }

    } catch (err) {
        res.status(500);
        throw new Error("Database error while verifying OTP.");
    }
    const{otp,expires_at} = student; 
    const now = new Date();
    if (expires_at < now){
        res.status(401);
        throw new Error("OTP has expired. Please request a new one.");
        
    } ;
    if (code === otp){
        try{
            await markStudentVerified(email);
            res.status(200).json({
                message:"OTP verified Successfully, Student marks verified."
            })
        }catch(err){
            res.status(500).json({
                message:"verifyOtp : Failed to mark student verified.",
                err:err.message
            })
        }
    }
});
module.exports = {sendVerificationCode,verifyOtp}