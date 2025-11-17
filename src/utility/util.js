const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

};

const validatePhone = (phone)=>{
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
}

const generateOTP  = ()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const otpExpireIn = ()=>{
    return new Date(Date.now() + 5 * 60000);
};
module.exports  ={
        validateEmail,
        validatePhone,
        generateOTP,
        otpExpireIn
};