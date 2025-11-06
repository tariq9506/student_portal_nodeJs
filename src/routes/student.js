const express = require("express");
const router = express.Router();
const {getStudentDetails,createStudent,updateStudentDetails, deleteStudentById} = require("../controller/student");

router.route("/").get(getStudentDetails);
router.route("/:id").put(updateStudentDetails);
router.route("/").post(createStudent);
router.route("/:id").delete(deleteStudentById);

module.exports = router;