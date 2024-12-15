import { Router } from 'express';
import { currentUser, signIn, signUp } from './auth.controller.js';
import passport from 'passport';
import './utils/googleStrategy.js'
const authRouter = Router();

authRouter.get('/current-user', currentUser)
authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
  res.redirect(`/home?token=${(req.user as any).token}`)
});

export default authRouter;