import express from 'express';
import Patient from '../Controllers/Auth.js';

const router = express.Router();

router.post("/Register",Patient.Register);
router.post("/Login",Patient.login);

export default router;

