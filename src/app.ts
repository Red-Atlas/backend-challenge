import './config/env';
import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers.js';
import userRouter from './components/user/user.routes.js';
import authRouter from './components/auth/auth.routes.js';
import transactionRouter from './components/transaction/transaction.routes.js';
import propertyRouter from './components/property/property.routes.js';
import advertisementsRouter from 'components/advertisement/advertisement.routes.js';
import session from 'express-session';
import passport from 'passport';

const app = express();

app.use(cors());
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/transactions', transactionRouter);
app.use('/properties', propertyRouter);
app.use('/advertisements', advertisementsRouter)

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;