import '../src/config/env';
import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from '../src/middlewares/errorHandlers';
import userRouter from '../src/components/user/user.routes';
import authRouter from '../src/components/auth/auth.routes';
import transactionRouter from '../src/components/transaction/transaction.routes';
import propertyRouter from '../src/components/property/property.routes';
import advertisementsRouter from '../src/components/advertisement/advertisement.routes';
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
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/properties', propertyRouter);
app.use('/api/advertisements', advertisementsRouter)

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;