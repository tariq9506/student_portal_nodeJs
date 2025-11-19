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
const verifyOtp = expressAsyncHandler(async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        throw new Error("Email address or OTP missing.");
    }

    if (!validateEmail(email)) {
        throw new Error("Invalid email address.");
    }

    // Find student
    const student = await findStudents(email);

    if (!student) {
        throw new Error("Student does not exist.");
    }

    const { otp, otp_expires_at } = student;
    const now = new Date();

    // Check expiry
    if (now > otp_expires_at) {
        res.status(400)
        throw new Error("OTP expired. Request a new one.");
    }

    // Check OTP
    if (otp !== code) {
        res.status(400)
        throw new Error("Incorrect OTP.");
    }
        try{
            // Mark verified
            await markStudentVerified(email);
        }catch(err){
            res.status(500);
            throw new Error("Failed to mark student verified.",err.message);
            
        }
    

    return res.status(200).json({
        message: "OTP verified successfully."
    });
});

module.exports = {sendVerificationCode,verifyOtp}