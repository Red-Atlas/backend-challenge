import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers.js';
import userRouter from './components/user/user.routes.js';
import authRouter from './components/auth/auth.routes.js';
import transactionRouter from './components/transaction/transaction.routes.js';
import propertyRouter from './components/property/property.routes.js';

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