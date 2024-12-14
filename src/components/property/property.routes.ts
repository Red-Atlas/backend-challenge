import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import {
  createProperty,
  deleteProperty,
  getAveragePricesBySector,
  getDistributionBySector,
  getProperties,
  getPropertiesByType,
  getPropertiesPagination,
  getProperty,
  inactiveProperty,
  updateProperty,
  getPropertiesWithValuation,
} from './property.controller.js';

const propertyRouter = Router();

propertyRouter.post('/properties', authenticate, createProperty);
propertyRouter.get('/properties', authenticate, getProperties);
propertyRouter.get('/properties/pagination', authenticate, getPropertiesPagination);
propertyRouter.get('/properties/valuation', authenticate, getPropertiesWithValuation);
propertyRouter.get('/properties/distribution', authenticate, getDistributionBySector);
propertyRouter.get('/properties/type', authenticate, getPropertiesByType);
propertyRouter.get('/properties/average-price-by-sector', authenticate, getAveragePricesBySector);
propertyRouter.get('/properties/:id', authenticate, getProperty);
propertyRouter.put('/properties/:id', authenticate, updateProperty);
propertyRouter.delete('/properties/:id', authenticate, deleteProperty);
propertyRouter.patch('/properties/:id', authenticate, inactiveProperty);

export default propertyRouter;
