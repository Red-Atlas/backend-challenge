import { DeepPartial } from "typeorm";
import { Advertisement } from "./advertisement.entity";
import { IAdvertisement, TCreateAdvertisement } from "./advertisement.dto";
import { AppDataSource } from "../../db";

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
  return Advertisement.create(data as DeepPartial<Advertisement>).save();
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

async function getAdvertisementsPriceRange(){
  const advertisementRepository = AppDataSource.getRepository(Advertisement);
  
  return advertisementRepository
    .createQueryBuilder('advertisement')
    .select([
      'CASE WHEN advertisement.price BETWEEN 0 AND 50000 THEN \'0-50k\' ' +
      'WHEN advertisement.price BETWEEN 50001 AND 100000 THEN \'50k-100k\' ' +
      'WHEN advertisement.price BETWEEN 100001 AND 150000 THEN \'100k-150k\' ' +
      'WHEN advertisement.price BETWEEN 150001 AND 200000 THEN \'150k-200k\' ' +
      'WHEN advertisement.price BETWEEN 200001 AND 250000 THEN \'200k-250k\' ' +
      'ELSE \'>250k\' END AS priceRange',
      
      'CASE WHEN advertisement.price BETWEEN 0 AND 50000 THEN 1 ' +
      'WHEN advertisement.price BETWEEN 50001 AND 100000 THEN 2 ' +
      'WHEN advertisement.price BETWEEN 100001 AND 150000 THEN 3 ' +
      'WHEN advertisement.price BETWEEN 150001 AND 200000 THEN 4 ' +
      'WHEN advertisement.price BETWEEN 200001 AND 250000 THEN 5 ' +
      'ELSE 6 END AS priceRangeOrder',

      'COUNT(advertisement.id) AS totalAdvertisements'
    ])
    .where('advertisement.active = :active', { active: true })
    .groupBy('priceRange')
    .addGroupBy('priceRangeOrder')
    .orderBy('priceRangeOrder')
    .getRawMany();
}

export const advertisementService = Object.freeze({
  findOne,
  find,
  update,
  create,
  deleteAdvertisement,
  inactiveAdvertisement,
  getAdvertisementsPriceRange,
})