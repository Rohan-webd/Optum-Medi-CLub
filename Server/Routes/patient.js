import express from 'express';
import Patient from '../Controllers/Patient_Register.js';
const router =express.Router();

router.get("/",Patient);

export default router;