import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import {
  createProperty,
  deleteProperty,
  getProperties,
  getProperty,
  inactiveProperty,
  updateProperty
} from './property.controller';

const propertyRouter = Router();

propertyRouter.post('/properties', authenticate, createProperty);
propertyRouter.get('/properties', authenticate, getProperties);
propertyRouter.get('/properties/:id', authenticate, getProperty);
propertyRouter.put('/properties/:id', authenticate, updateProperty);
propertyRouter.delete('/properties/:id', authenticate, deleteProperty);
propertyRouter.patch('/properties/:id', authenticate, inactiveProperty);

export default propertyRouter;
