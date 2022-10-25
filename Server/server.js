import express from  'express';
const app = express();
const PORT = 5000;
import PatientRoute from './Routes/auth.js';
import DoctorRoute from './Routes/Doctor.js';
import connect from './config/database.js';
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.use(express.json());
app.use('/Patient',PatientRoute);
app.use('/Doctor',DoctorRoute);
connect();  
app.listen(PORT,()=>{
console.log(`Server is Running at ${PORT}`);
})