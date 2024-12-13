import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, inactiveUser, updateUser } from './user.controller';
import { authenticate } from '../../middlewares/authenticate';

const userRouter = Router();

userRouter.post('/users', authenticate, createUser);
userRouter.get('/users', authenticate, getUsers);
userRouter.get('/users/:id', authenticate, getUser);
userRouter.put('/users/:id', authenticate, updateUser);
userRouter.delete('/users/:id', authenticate, deleteUser);
userRouter.patch('/users/:id/active', authenticate, inactiveUser);

export default userRouter;
