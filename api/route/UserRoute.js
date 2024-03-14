import express from "express";
import {test, updateUser,deleteUser } from "../controller/UserController.js";
import { checkToken } from "../util/checkUser.js";


const router = express.Router();

router.get("/test", test);
router.put('/update/:id',checkToken,updateUser); 
router.delete('/delete/:id',checkToken,deleteUser);   

export default router;