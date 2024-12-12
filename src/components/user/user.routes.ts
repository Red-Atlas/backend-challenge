import { Router } from 'express';
import { createUser, getUser, getUsers, toggleUserActive, updateUser } from './user.controller.js';

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.put('/users/:id', updateUser);
userRouter.patch('/users/:id/active', toggleUserActive);

export default userRouter;
