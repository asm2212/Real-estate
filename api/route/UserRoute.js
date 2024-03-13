import express from "express";
import {test, updateUser } from "../controller/UserController.js";


const router = express.Router();

router.get("/test", test);
router.post('/update/:id',updateUser);    

export default router;