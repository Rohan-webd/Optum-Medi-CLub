import jwt from "jsonwebtoken";
import Patient from "../models/Patient.js";

const VerifyToken = async (req,res,next)=>{

    try{

const token = req.cookies.AccessToken;
const verifytoken = jwt.verify(token,"kfknpadfoeovnqov");
const rootPatient = await Patient.findOne({_id:verifytoken._id,"tokens.token":token });

if(!rootPatient){
    throw new Error('Patient Not Found');
}
req.token = token;
req.rootPatient =rootPatient;
req.Patientid = rootPatient._id;

next();

    }
    catch(err){
        res.status(401).send("You Are Unauthorized:NO token Found");
        console.log(err);
        
    }

};

export default VerifyToken;