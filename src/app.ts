import express from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers.js';
import userRouter from './components/user/user.routes.js';
import authRouter from './components/auth/auth.routes.js';

const app = express();

app.use(cors());

app.use(express.json())
app.use(userRouter)
app.use(authRouter)

// error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;