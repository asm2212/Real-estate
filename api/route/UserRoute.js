import express from "express";
import {test, updateUser,deleteUser ,getUserLists} from "../controller/UserController.js";
import { checkToken } from "../util/checkUser.js";


const router = express.Router();

router.get("/test", test);
router.put('/update/:id',checkToken,updateUser); 
router.delete('/delete/:id',checkToken,deleteUser);
router.get('/lists/:id',checkToken,getUserLists)   

export default router;