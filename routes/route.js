import express from 'express';
import { Signup} from '../controllers/userController.js';
import cors from 'cors';
const router = express.Router();
router.use(cors());
router.post("/signup", Signup);


export default router;

