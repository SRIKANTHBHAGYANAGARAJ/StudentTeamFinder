
import express from 'express';
import { login, register } from '../controller/authController.js';
import { loginValidation, registerValidation } from '../validation/authvalidation.js';


const authRouter = express.Router();

authRouter.post('/register', registerValidation, register);
authRouter.post('/login', loginValidation, login); 


export default authRouter;