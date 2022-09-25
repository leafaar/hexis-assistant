import { Router } from 'express';
import authRouter from  './auth';
import walletRouter from  './wallet';
import guildsRouter from './guilds';
import userRouter from './user';


const router = Router();

router.use('/auth', authRouter);
router.use('/wallet', walletRouter);
router.use('/user', userRouter);
router.use('/guilds', guildsRouter);

export default router;