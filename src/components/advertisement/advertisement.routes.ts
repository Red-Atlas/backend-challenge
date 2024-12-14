import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import {
  createAdvertisement,
  deleteAdvertisement,
  getAdvertisement,
  getAdvertisements,
  getAdvertisementsPriceRange,
  inactiveAdvertisement,
  updateAdvertisement
} from './advertisement.controller.js';

const advertisementsRouter = Router();

advertisementsRouter.post('/advertisements', authenticate, createAdvertisement);
advertisementsRouter.get('/advertisements', authenticate, getAdvertisements);
advertisementsRouter.get('/advertisements/price-range', authenticate, getAdvertisementsPriceRange);
advertisementsRouter.get('/advertisements/:id', authenticate, getAdvertisement);
advertisementsRouter.put('/advertisements/:id', authenticate, updateAdvertisement);
advertisementsRouter.delete('/advertisements/:id', authenticate, deleteAdvertisement);
advertisementsRouter.patch('/advertisements/:id', authenticate, inactiveAdvertisement);

export default advertisementsRouter;
