import express from 'express';
import { createList } from '../controller/ListController.js';
import { checkToken } from '../util/checkUser.js';

const router = express.Router();

router.get('/create',checkToken,createList);

export default router;