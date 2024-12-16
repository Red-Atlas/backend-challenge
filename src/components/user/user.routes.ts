import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, inactiveUser, updateUser } from './user.controller';
import { authenticate } from '../../middlewares/authenticate';
import { adminAuthenticate } from '../../middlewares/adminAuthenticate';

const userRouter = Router();

userRouter.post('/', authenticate, createUser);
userRouter.get('/', authenticate, getUsers);
userRouter.get('/:id', authenticate, getUser);
userRouter.put('/:id', authenticate, updateUser);
userRouter.delete('/:id', authenticate, deleteUser);
userRouter.patch('/:id/inactive', adminAuthenticate, inactiveUser);

export default userRouter;
