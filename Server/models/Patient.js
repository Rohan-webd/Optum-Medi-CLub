import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const PatientSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
    minLength: [6, "Password must be atleast 6 characters"],
  },

  Contact: {
    type: Number,
    required: true,
    minLength: 10,
    MaxLength: 10,
  },

  Gender: {
    type: String,
    required: true,
  },

  Address: {
    type: String,
    required: true,
  },
  Problems: {
    type: [String],
    require: true,
  },
  tokens:[
    {

      token:{
        type:String,
        required:true
      }
    }
  ]
});
PatientSchema.methods.generateAuthToken = async function(){

  try{
let token = jwt.sign({_id:this._id},"kfknpadfoeovnqov");
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;
  }
  catch(err){

    

  }


}
export default mongoose.model("Patient",PatientSchema);
