const express = require("express");
const multer = require('multer');
const router = express.Router();

const { 
  getStudentDetails,
  createStudent,
  updateStudentDetails,
  deleteStudentById} = require("../controller/student");
const upload = multer(); 

router.route("/").post(upload.none(),createStudent);
router.route("/").get(getStudentDetails);
router.route("/:id").put(updateStudentDetails);

router.route("/:id").delete(deleteStudentById);

module.exports = router;