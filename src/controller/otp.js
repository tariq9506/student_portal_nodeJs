const { saveOTP } = require("../models/otp");
const { sendOtp } = require("../utility/sendEmail");
const { generateOTP, otpExpireIn } = require("../utility/util");

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

module.exports = {sendVerificationCode}