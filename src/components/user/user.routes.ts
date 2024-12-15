import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, inactiveUser, updateUser } from './user.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { adminAuthenticate } from '../../middlewares/adminAuthenticate.js';

const userRouter = Router();

userRouter.post('/', authenticate, createUser);
userRouter.get('/', authenticate, getUsers);
userRouter.get('/:id', authenticate, getUser);
userRouter.put('/:id', authenticate, updateUser);
userRouter.delete('/:id', authenticate, deleteUser);
userRouter.patch('/:id/inactive', adminAuthenticate, inactiveUser);

export default userRouter;
