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
import { adminAuthenticate } from '../../middlewares/adminAuthenticate.js';

const advertisementsRouter = Router();

// Statistics/Graphs Routes
advertisementsRouter.get('/analytics/price-range', adminAuthenticate, getAdvertisementsPriceRange);

// CRUDS
advertisementsRouter.post('/', authenticate, createAdvertisement);
advertisementsRouter.get('/', authenticate, getAdvertisements);
advertisementsRouter.get('/:id', authenticate, getAdvertisement);
advertisementsRouter.put('/:id', authenticate, updateAdvertisement);
advertisementsRouter.delete('/:id', authenticate, deleteAdvertisement);
advertisementsRouter.patch('/:id/inactive', adminAuthenticate, inactiveAdvertisement);

export default advertisementsRouter;
