import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
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
  findPropertiesWithinRadius,
  findPropertiesOrderedByProximity,
} from './property.controller';
import { adminAuthenticate } from '../../middlewares/adminAuthenticate';

const propertyRouter = Router();

propertyRouter.get('/valuation', authenticate, getPropertiesWithValuation);

// Statistics/Graphs Routes
propertyRouter.get('/analytics/distribution', adminAuthenticate, getDistributionBySector);
propertyRouter.get('/analytics/type-stats', adminAuthenticate, getPropertiesByType);
propertyRouter.get('/analytics/average-price-by-sector', adminAuthenticate, getAveragePricesBySector);

// Geo-Location Routes
propertyRouter.get('/geo-location/within-radius', authenticate, findPropertiesWithinRadius);
propertyRouter.get('/geo-location/ordered-by-proximity', authenticate, findPropertiesOrderedByProximity);

// CRUDS
propertyRouter.post('/', authenticate, createProperty);
propertyRouter.get('/', authenticate, getProperties);
propertyRouter.get('/pagination', authenticate, getPropertiesPagination);
propertyRouter.get('/:id', authenticate, getProperty);
propertyRouter.put('/:id', authenticate, updateProperty);
propertyRouter.delete('/:id', authenticate, deleteProperty);
propertyRouter.patch('/:id/inactive', adminAuthenticate, inactiveProperty);

export default propertyRouter;
