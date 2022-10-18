import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Register = async (req, res, next) => {
  try {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password,salt);

    const NewPatient = new Patient({
      Name:req.body.Name,
      Email:req.body.Email,
      Password:hash,
      Contact:req.body.Contact,
      Gender:req.body.Gender,
      Address:req.body.Address,
      Problems:req.body.Problems});
    const savedPatient =  await NewPatient.save();
    res.status(200).json(savedPatient);

  } catch (err) {
    next(err);
  }
};

const login = async(req,res,next)=>{

try{
const ExistingPatient = await Patient.findOne({Email:req.body.Email});
if(!ExistingPatient){
    res.status(500).json({message:"PATIENT NOT FOUND"});

}
const passcrct = await bcrypt.compare(req.body.password,ExistingPatient?.Password);
if(!passcrct){
    res.status(500).json({message:"INVALID CREDENTIALS"});
}

const token = jwt.sign({id:ExistingPatient?._id},"adiilmnvbh")

const { Password , ...OtherDetails} = ExistingPatient._doc;
res.cookie("AccessToken",token,{
  httpOnly:true
}).status(200).json({...OtherDetails});
}
catch(err){
    next(err);
}
}

export default {Register,login};
