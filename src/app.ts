import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers';
import userRouter from './components/user/user.routes';
import authRouter from './components/auth/auth.routes';
import transactionRouter from './components/transaction/transaction.routes';
import propertyRouter from './components/property/property.routes';

const app = express();

app.use(cors());

app.use(express.json())
app.use(userRouter)
app.use(authRouter)
app.use(transactionRouter)
app.use(propertyRouter)

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;