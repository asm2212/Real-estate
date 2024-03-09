import express from "express";
import {test } from "../controller/UserController.js";


const router = express.Router();

router.get("/test", test);       

export default router;