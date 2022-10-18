import mongoose from 'mongoose';  
const CONNURL = 'mongodb+srv://Mediclub:hellorohan@cluster0.bareap0.mongodb.net/?retryWrites=true&w=majority';
const connect = async ()=>{

try{
const conn = await mongoose.connect(CONNURL,{

useNewUrlParser : true,
useUnifiedTopology:true

});
if(conn){
 console.log("Connection Successful");
    }
}

catch(err){
 throw err;
}


}

export default connect;

