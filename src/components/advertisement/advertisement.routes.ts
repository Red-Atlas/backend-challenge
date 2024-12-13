import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import {
  createAdvertisement,
  deleteAdvertisement,
  getAdvertisement,
  getAdvertisements,
  inactiveAdvertisement,
  updateAdvertisement
} from './advertisement.controller';

const transactionRouter = Router();

transactionRouter.post('/advertisements', authenticate, createAdvertisement);
transactionRouter.get('/advertisements', authenticate, getAdvertisements);
transactionRouter.get('/advertisements/:id', authenticate, getAdvertisement);
transactionRouter.put('/advertisements/:id', authenticate, updateAdvertisement);
transactionRouter.delete('/advertisements/:id', authenticate, deleteAdvertisement);
transactionRouter.patch('/advertisements/:id', authenticate, inactiveAdvertisement);

export default transactionRouter;
