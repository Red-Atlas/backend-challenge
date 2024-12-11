import AppDataSource from "../database/connect";
import { Property } from "../entities/Property.entity";

const PropertyRepository = AppDataSource.getRepository(Property);

export default PropertyRepository;
