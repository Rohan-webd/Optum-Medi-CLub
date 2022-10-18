import Doctor from "../models/Doctor.js";

// Register New Doctor
const register = async (req, res) => {
  try {
 const AlrDoctor = await Doctor.findOne({Email:req.body.Email});
  if (AlrDoctor) {
      res.status(400).json({ message: "This Doctor already exists" });
    } else {
      const doctor = new Doctor(req.body);
      const SavedDoctor = await doctor.save();
      res.status(200).json(SavedDoctor);
    }
  } catch (err) {
    throw err;
  }
};
// Update Existing Doctor
const update = async(req,res)=>{
try{
const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

res.status(200).json(updatedDoctor);

}
catch(err){
res.status(500).json(err);
}
}

// Get a Doctor
const GetDoctor = async(req,res,next)=>{
  try{
  const doctor = await Doctor.findById(req.params.id);
  
  res.status(200).json(doctor);
  
  
  }
  catch(err){
  res.status(500).json(err);
  }
  }

const Send = async (req, res) => {
  res.send("YEHA PE DOCTOR REGISTRATION FORM HOGAAA");
};

export default { register, Send ,update,GetDoctor};
