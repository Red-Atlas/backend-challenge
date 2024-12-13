import { DeepPartial } from "typeorm";
import { Advertisement } from "./advertisement.entity.js";
import { IAdvertisement, TCreateAdvertisement } from "./advertisement.dto.js";

async function findOne({
  filter,
}: { filter: Partial<Omit<IAdvertisement, 'transactions'>> }): Promise<Advertisement> {
  const advertisement = await Advertisement.findOneBy({ ...filter, active: true });
  if (!advertisement) {
    throw new Error('advertisement not found')
  }

  return advertisement
}

async function find(filter?: Partial<Omit<IAdvertisement, 'transactions'>>): Promise<Array<Advertisement>> {
  return Advertisement.find({where: filter})
}

async function update({
  id, data
}: { 
  id: IAdvertisement['id'], data: Partial<Advertisement>
}): Promise<{ success: boolean, message: string }> {
  await findOne({ filter: { id } });

  await Advertisement.update({ id }, data)

  return {
    success: true,
    message: 'Advertisement updated successfully'
  }
}

async function create(
  data: TCreateAdvertisement
): Promise<Advertisement> {
  return Advertisement.create(data as DeepPartial<Advertisement>);
}

async function deleteAdvertisement(id: IAdvertisement['id']): Promise<string> {
  const advertisement = await findOne({ filter: { id }});
  await advertisement.remove()
  return 'Advertisement Deleted successfully'
};

async function inactiveAdvertisement(id: IAdvertisement['id']): Promise<Advertisement> {
  const advertisement = await findOne({ filter: { id } });

  advertisement.active = false

  return advertisement.save()
}

export const advertisementService = Object.freeze({
  findOne,
  find,
  update,
  create,
  deleteAdvertisement,
  inactiveAdvertisement,
})