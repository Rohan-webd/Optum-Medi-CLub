import mongoose from "mongoose";

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
});

export default mongoose.model("Patient",PatientSchema);
