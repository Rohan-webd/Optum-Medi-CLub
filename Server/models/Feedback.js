import mongoose from 'mongoose';

const FeedbackSchema =  new mongoose.Schema({


Patient:{
    type:String,
    required:true
},
Doctor:{
    type:String,
    required:true
},
Feedback:{
    type:String,
    required:true
},
})


const Feedback = mongoose.model("Feedback",FeedbackSchema);
export default Feedback;