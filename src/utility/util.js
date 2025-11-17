const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);

};

const validatePhone = (phone)=>{
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
}
module.exports  ={
        validateEmail,
        validatePhone
}