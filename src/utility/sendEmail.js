const nodemailer = require("nodemailer");

const tranporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_EMAIL_PASS_KEY
    }
});

const sendOtp = async(email,otp)=>{
    const mailOptions ={
        from: process.env.SMTP_EMAIL,
        to : email,
        subject: "Your OTP verification code",
        text:`Your OTP code is :     ${otp}. It will expire in 5 min.`
    };
    await tranporter.sendMail(mailOptions);
};

module.exports ={sendOtp};