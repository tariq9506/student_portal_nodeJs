const express = require("express");
const multer = require('multer');
const router = express.Router();

const { 
  getStudentDetails,
  createStudent,
  updateStudentDetails,
  deleteStudentById,
  studentLogin} = require("../controller/student");
const validateToken = require("../middleware/jwtValidate");
const { verifyOtp } = require("../controller/otp");
const upload = multer(); 

router.route("/register").post(upload.none(),createStudent);
router.route("/details").get(validateToken,upload.none(),getStudentDetails);
// router.route("/:id").put(updateStudentDetails);

router.route("/:id").delete(deleteStudentById);

router.route("/login").post(upload.none(),studentLogin);
router.route("/otp-verify").put(upload.none(),verifyOtp);

module.exports = router;