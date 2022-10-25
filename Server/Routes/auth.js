import express from 'express';
import Patient from '../Controllers/Auth.js';

const router = express.Router();
// Patient Register
router.post("/Register",Patient.Register);

// Patient Login
router.post("/Login",Patient.login);

export default router;

