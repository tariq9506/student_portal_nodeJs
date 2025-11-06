const express = require("express");
const router = express.Router();

router.route("/").get( (req, res) => {
  console.log('GET / hit!'); // <- this will print on every browser hit
res.status(200).json({message:"Student Portal API is running 🚀"});
})
router.route("/:id").put( (req, res) => {
  console.log('GET / hit!'); // <- this will print on every browser hit
res.status(200).json({message:'Student Portal API is running 🚀'});
})
router.route("/").post( (req, res) => {
  console.log('GET / hit!'); // <- this will print on every browser hit
  res.status(200).json({message:'Student Portal API is running 🚀'});
})
router.route("/:id").delete( (req, res) => {
  console.log('GET / hit!'); // <- this will print on every browser hit
res.status(200).json({message:'Student Portal API is running 🚀'});
})

module.exports = router;