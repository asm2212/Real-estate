import express from "express";
import {test, updateUser } from "../controller/UserController.js";
import { checkToken } from "../util/checkUser.js";


const router = express.Router();

router.get("/test", test);
router.put('/update/:id',checkToken,updateUser);    

export default router;