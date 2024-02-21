import express from 'express';
import { Signup,Login} from '../controllers/userController.js';
import cors from 'cors';
const router = express.Router();
router.use(cors());

router.post("/signup", Signup);
router.post("/login", Login);



export default router;

