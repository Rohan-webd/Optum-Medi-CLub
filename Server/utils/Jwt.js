import jwt from "jsonwebtoken";

const VerifyToken = (req,res,next)=>{

const token = req.cookies.AccessToken;
if(!token){

    return res.status(500).json({message:"Your are not authenticated"})
}

jwt.verify(token,"adiilmnvbh",(err,Doc)=>{

if(err) return err;
req.Doctor = Doc;
next();

});

};

export default VerifyToken;