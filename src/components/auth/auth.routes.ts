import { Router } from 'express';
import { currentUser, signIn, signUp } from './auth.controller';

const authRouter = Router();

authRouter.get('/auth/current-user', currentUser)
authRouter.post('/auth/sign-up', signUp)
authRouter.post('/auth/sign-in', signIn)

export default authRouter;