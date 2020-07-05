import { Router } from 'express';
import { } from '../controller/authController';

const router = Router();

//auth login

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/sign-in-with-different-account', authController.newAccount);

export { router };