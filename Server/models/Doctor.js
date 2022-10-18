import mongoose from "mongoose";
import Geocoder from "../utils/geocode.js";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false,
  },

  Contact: {
    type: Number,
    required: true,
  },

  Gender: {
    type: String,
    required: true,
  },

  Degrees: {
    type: [String],
    required: true,
  },

  Specialization: {
    type: [String],
    required: true,
  },

  Address: {
    type: String,
    required: true,
  },

  Location: {
    type: { type: String ,
    enum: ['point']},
    coordinates: {
      type:[Number],
      index:'2dsphere'
    },
    formattedAddress: String
  },

  Problems: {
    type: [String],
    require: true,
  },

  Upvotes: {
    type: Number,
    min: 0,
  },
});

DoctorSchema.index({ Location: "2dsphere" });

DoctorSchema.pre('save',async function(next){


  const loc = await Geocoder.geocode(this.Address);
 this.Location = {

  type:'Point',
  coordinates: [loc[0].longitude,loc[0].latitude]
 }
  this.Address = undefined;
  next();
})
const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
