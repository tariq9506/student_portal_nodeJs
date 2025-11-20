const express = require("express");
const multer = require('multer');
const router = express.Router();
const validateToken = require("../middleware/jwtValidate");
const { 
  getStudentDetails,
  createStudent,
  updateStudentDetails,
  deleteStudentById,
  studentLogin} = require("../controller/student");
const { 
      verifyOtp, 
      resendOTP 
    } = require("../controller/otp");
const upload = multer(); 

router.route("/register").post(upload.none(),createStudent);
router.route("/profile").get(validateToken,upload.none(),getStudentDetails);
router.route("/update/:id").put(updateStudentDetails);

router.route("/:id").delete(deleteStudentById);

router.route("/login").post(upload.none(),studentLogin);
router.route("/otp-verify").put(upload.none(),verifyOtp);
router.route("/resent-otp").put(upload.none(),resendOTP);

module.exports = router;