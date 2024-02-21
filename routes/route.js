import express from 'express';
import { AuthenticateToken } from '../middleware/authenticateToken.js';

import { Signup,Login,Logout} from '../controllers/userController.js';
import cors from 'cors';
const router = express.Router();
router.use(cors());

router.post("/signup", Signup);
router.post("/login", Login);
router.get('/logout', AuthenticateToken, Logout);




export default router;

