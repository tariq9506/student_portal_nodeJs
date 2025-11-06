const getStudentDetails = (req,res)=>{
    res.status(200).json({message:"Get student details"});
};
const createStudent = (req, res) => {
  console.log('POST / hit!'); // <- this will print on every browser hit
res.status(201).json({message:'Student Portal API is running 🚀. Student created successfully.'});
}
const updateStudentDetails = (req, res) => {
  console.log('PUT / hit!'); // <- this will print on every browser hit
  res.status(200).json({message:'Student Portal API is running 🚀. Student details updated successfully.'});
};
const deleteStudentById =  (req, res) => {
  console.log('DELETE / hit!'); // <- this will print on every browser hit
res.status(200).json({message:'Student Portal API is running 🚀,Student delete successfully'});
};
module.exports={getStudentDetails, createStudent,updateStudentDetails,deleteStudentById};