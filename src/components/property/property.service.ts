import { DeepPartial } from "typeorm";
import { IProperty, TCreateProperty } from "./property.dto.js";
import { Property } from "./property.entity.js";

async function findOne({
  filter,
}: { filter: Partial<Omit<IProperty, 'images' | 'advertisement'>> }): Promise<Property> {
  const property = await Property.findOneBy({ ...filter, active: true });
  if (!property) {
    throw new Error('property not found')
  }

  return property
}

async function find(
  filter?: Partial<Omit<IProperty, 'images' | 'advertisement'>>
): Promise<Array<Property>> {
  return Property.find({where: filter})
}

async function update({
  id, data
}: { 
  id: IProperty['id'], data: Partial<Property>
}): Promise<{ success: boolean, message: string }> {
  await findOne({ filter: { id } });

  await Property.update({ id }, data)

  return {
    success: true,
    message: 'Property updated successfully'
  }
}

async function create(
  data: TCreateProperty
): Promise<Property> {
  return Property.create(data as DeepPartial<Property>);
}

async function deleteProperty(id: IProperty['id']): Promise<string> {
  const property = await findOne({ filter: { id }});
  await property.remove()
  return 'Property Deleted successfully'
};

async function inactiveProperty(id: IProperty['id']): Promise<Property> {
  const property = await findOne({ filter: { id } });

  property.active = false

  return property.save()
}

export const propertyService = Object.freeze({
  findOne,
  find,
  update,
  create,
  deleteProperty,
  inactiveProperty,
})