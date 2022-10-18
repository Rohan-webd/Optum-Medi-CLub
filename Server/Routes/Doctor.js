import express from "express";
import Doctor from "../Controllers/Doctor_Register.js";
import VerifyToken from "../utils/Jwt.js";
const router = express.Router();

router.get("/:id",VerifyToken,Doctor.GetDoctor);
router.put("/:id",Doctor.update);
router.post("/Register", Doctor.register);

export default router;

