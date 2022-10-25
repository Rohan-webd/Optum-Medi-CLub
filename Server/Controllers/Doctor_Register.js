import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register New Doctor
const register = async (req, res) => {
  try {
 const AlrDoctor = await Doctor.findOne({Email:req.body.Email});
  if (AlrDoctor) {
      res.status(400).json({ message: "This Doctor already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.Password,salt);

      const doctor = new Doctor({
        name:req.body.Name,
        Email:req.body.Email,
        Password:hash,
        Contact:req.body.Contact,
        Gender:req.body.Gender,
        Degrees:req.body.Degrees,
        Specialization:req.body.Specialization,
        Address:req.body.Address,
        Problems:req.body.Problems
      });
      const SavedDoctor = await doctor.save();
      res.status(200).json(SavedDoctor);
    }
  } catch (err) {
    throw err;
  }
};
// Login Doctor
const login = async(req,res,next)=>{

  try{
  const ExistingDoctor = await Doctor.findOne({Email:req.body.Email}).select("+Password");
  if(!ExistingDoctor){
      res.status(500).json({message:"DOCTOR NOT FOUND"});
  
  }
  const passcrct = await bcrypt.compare(req.body.Password,ExistingDoctor?.Password);
if(!passcrct){
    res.status(500).json({message:"INVALID CREDENTIALS"});
}
  
  const token = jwt.sign({id:ExistingDoctor?._id},"adiilmnvbh")
  
  const { Password , ...OtherDetails} = ExistingDoctor._doc;
  res.cookie("AccessToken",token,{
    httpOnly:true
  }).status(200).json({...OtherDetails});
  }
  catch(err){
      next(err);
  }
  }
  
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

// Get a Doctor by Doctor ID
const GetDoctor = async(req,res,next)=>{
  try{
  const doctor = await Doctor.findById(req.params.id);
  
  res.status(200).json(doctor);
  
  
  }
  catch(err){
  res.status(500).json(err);
  }
  }
// Get Doctor by Upvotes and Nearest Location
// Not Currently Needed
// const FindDoctor = async (req,res,next)=>{

//   try{
//     const latitude = req.body.latitude;
//     const longitude = req.body.longitude;
   
// const NearDoctor = await Doctor.aggregate([
// {

//   $geoNear:{
//     near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
//     key:"Location",
//     maxDistance: parseFloat(100)*1609,
//     distanceField:"dist.calculated",
//     spherical:true,
//     query:{Upvotes:{$gt:20}}

//   }
// }

// ]);
// // console.log(NearDoctor);

// res.status(200).send({success:true,msg:"Doctor Details",data:NearDoctor});
//   }
//   catch(err){
//     throw err;
//   }
// }

const DoctorFetch = async (req,res,next)=>{


try{
// Get Patient
// const NewPatient = await Patient.findById({_id:req.body.id});


  let latitude=req.body.latitude;
  let longitude=req.body.longitude;
const Newdoctor = await Doctor.find({

  Location:{
    $near:{

      $geometry:{
        type:"Point",
        coordinates:[ parseFloat(longitude),parseFloat(latitude)]
      },
      $maxDistance : (10)*1609,
      
    }
  },
  Upvotes:{$gt:30},
  // Problems:{$all:[NewPatient?.Problems[0],NewPatient?.Problems[1],NewPatient?.Problems[2]]}
});

console.log(req.rootPatient);

// res.send(req.rootPatient);
res.status(200).json(Newdoctor);
}

catch(err){

  throw err;
}

}
const Send = async (req, res) => {
  res.send("YEHA PE DOCTOR REGISTRATION FORM HOGAAA");
};

export default { register, Send ,update,GetDoctor,DoctorFetch,login};
