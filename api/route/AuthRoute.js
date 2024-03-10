import express from "express";
import { signup } from "../controller/AuthController.js";

const router = express.Router();

router.post('/signup', signup);

export default router;