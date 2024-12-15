import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from '../listings/entities/listing.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,

    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,

    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  //Obtener las valoraciones de todas las propiedades
  async getValuationAllValuations(limit: number, page: number): Promise<any> {
    const [properties, totalCount] =
      await this.propertiesRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });

    const propertiesWithValuation = [];

    for (const property of properties) {
      if (isNaN(property.area) || property.area <= 0) {
        throw new Error(
          `El área de la propiedad con ID ${property.id} no es válida: ${property.area}`,
        );
      }

      // Obtener el precio promedio de los anuncios para cada propiedad
      const avgPrice = await this.getAveragePriceByPropertyId(property.id);

      if (isNaN(avgPrice.averagePrice) || avgPrice.averagePrice <= 0) {
        throw new Error(
          `El precio promedio para la propiedad con ID ${property.id} no es válido: ${avgPrice.averagePrice}`,
        );
      }

      // Calcular la valoración multiplicando el área por el precio promedio
      const valuation = property.area * avgPrice.averagePrice;

      if (isNaN(valuation) || valuation <= 0) {
        throw new Error(
          `La valoración calculada para la propiedad con ID ${property.id} es inválida: ${valuation}`,
        );
      }

      propertiesWithValuation.push({
        id: property.id,
        valuation,
        area: property.area,
        averagePrice: avgPrice.averagePrice,
        totalListings: avgPrice.totalListings,
        maxPrice: avgPrice.maxPrice,
        minPrice: avgPrice.minPrice,
        message: `La valoración de la propiedad con ID ${property.id} se calcula tomando en cuenta un área de ${property.area} m² y un precio promedio de ${avgPrice.averagePrice.toFixed(2)} por metro cuadrado, basado en un total de ${avgPrice.totalListings} anuncios activos. El precio máximo registrado es ${avgPrice.maxPrice.toFixed(2)} y el mínimo es ${avgPrice.minPrice.toFixed(2)}.`,
      });
    }

    return {
      data: propertiesWithValuation,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  // Crear Propiedad
  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertiesRepository.create(createPropertyDto);
    return this.propertiesRepository.save(property);
  }

  // Obtener todas las propiedades (con filtros opcionales y paginación)
  async findAll(filters?: any): Promise<any> {
    const query = this.propertiesRepository.createQueryBuilder('property');

    // Filtro por sector
    if (filters?.sector) {
      query.andWhere('property.sector = :sector', { sector: filters.sector });
    }

    // Filtro por tipo de propiedad (en base a la relación con Listings)
    if (filters?.property_type) {
      query
        .innerJoin('property.listings', 'listingType')
        .andWhere('listingType.property_type = :property_type', {
          property_type: filters.property_type,
        });
    }

    // Filtro por rango de precios (en base a la relación con Listings) lo que quiere decir que es en base a la publicacion
    if (filters?.price_min && filters?.price_max) {
      query
        .innerJoin('property.listings', 'listingPrice')
        .andWhere('listingPrice.price BETWEEN :price_min AND :price_max', {
          price_min: filters.price_min,
          price_max: filters.price_max,
        });
    }

    // Paginación
    const page = parseInt(filters?.page, 10) || 1;
    const limit = parseInt(filters?.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [properties, totalCount] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const propertiesWithDetails = await Promise.all(
      properties.map(async (property) => {
        if (isNaN(property.area) || property.area <= 0) {
          throw new Error(
            `El área de la propiedad con ID ${property.id} no es válida: ${property.area}`,
          );
        }

        const avgPrice = await this.getAveragePriceByPropertyId(property.id);

        if (isNaN(avgPrice.averagePrice) || avgPrice.averagePrice <= 0) {
          throw new Error(
            `El precio promedio para la propiedad con ID ${property.id} no es válido: ${avgPrice.averagePrice}`,
          );
        }

        // Calcular la valoración multiplicando el área por el precio promedio
        const valuation = property.area * avgPrice.averagePrice;

        if (isNaN(valuation) || valuation <= 0) {
          throw new Error(
            `La valoración calculada para la propiedad con ID ${property.id} es inválida: ${valuation}`,
          );
        }

        return {
          id: property.id,
          address: property.address,
          area: property.area,
          sector: property.sector,
          owner_name: property.owner_name,
          created_at: property.created_at,
          valuation,
          averageListingPrice: avgPrice.averagePrice,
          totalListings: avgPrice.totalListings,
          maxListingPrice: avgPrice.maxPrice,
          minListingPrice: avgPrice.minPrice,
          message: `La valoración de la propiedad con ID ${property.id} se calcula tomando en cuenta un área de ${property.area} m² y un precio promedio de ${avgPrice.averagePrice.toFixed(2)} por metro cuadrado, basado en un total de ${avgPrice.totalListings} anuncios activos. El precio máximo registrado en los anuncios es ${avgPrice.maxPrice.toFixed(2)} y el mínimo es ${avgPrice.minPrice.toFixed(2)}.`,
        };
      }),
    );

    return {
      data: propertiesWithDetails,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  // Obtener una propiedad por su ID
  async findOne(id: number): Promise<Property> {
    const property = await this.propertiesRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  // Actualizar una propiedad
  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.propertiesRepository.preload({
      id,
      ...updatePropertyDto,
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return this.propertiesRepository.save(property);
  }

  // Eliminar una propiedad
  async remove(id: number): Promise<void> {
    const property = await this.propertiesRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    await this.propertiesRepository.remove(property);
  }

  // Obtener anuncios de una propiedad
  async getListingsByPropertyId(
    id: number,
  ): Promise<{ property: Property; listings: Listing[] }> {
    const property = await this.propertiesRepository.findOne({
      where: { id },
      relations: ['listings'],
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return {
      property,
      listings: property.listings,
    };
  }

  // Obtener transacciones de una propiedad
  async getTransactionsByPropertyId(id: number): Promise<{
    property: Omit<Property, 'transactions'>;
    transactions: Transaction[];
  }> {
    const property = await this.propertiesRepository.findOne({
      where: { id },
      relations: ['transactions', 'transactions.listing'],
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    const { transactions, ...propertyWithoutTransactions } = property;

    return {
      property: propertyWithoutTransactions,
      transactions,
    };
  }

  // Obtener precio promedio por tipo de propiedad con información adicional
  async getAveragePriceByPropertyId(id: number): Promise<any> {
    const result = await this.listingsRepository
      .createQueryBuilder('listing')
      .select('AVG(listing.price)', 'averagePrice')
      .addSelect('COUNT(listing.id)', 'totalListings')
      .addSelect('MAX(listing.price)', 'maxPrice')
      .addSelect('MIN(listing.price)', 'minPrice')
      .where('listing.property_id = :id', { id })
      .andWhere('listing.status = :status', { status: 'for_sale' })
      .getRawOne();

    const averagePrice = result?.averagePrice
      ? parseFloat(result.averagePrice)
      : 0;
    const totalListings = result?.totalListings
      ? parseInt(result.totalListings, 10)
      : 0;
    const maxPrice = result?.maxPrice ? parseFloat(result.maxPrice) : 0;
    const minPrice = result?.minPrice ? parseFloat(result.minPrice) : 0;

    return {
      averagePrice: isNaN(averagePrice) ? 0 : averagePrice,
      totalListings: isNaN(totalListings) ? 0 : totalListings,
      maxPrice: isNaN(maxPrice) ? 0 : maxPrice,
      minPrice: isNaN(minPrice) ? 0 : minPrice,
    };
  }

  // Obtener precio de venta promedio por propiedad
  async getAverageSalePriceByPropertyId(id: number): Promise<any> {
    const result = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('AVG(transaction.price)', 'averagePrice')
      .addSelect('COUNT(transaction.id)', 'totalTransactions')
      .addSelect('MAX(transaction.price)', 'maxPrice')
      .addSelect('MIN(transaction.price)', 'minPrice')
      .where('transaction.property_id = :id', { id })
      .andWhere('transaction.type = :type', { type: 'sale_purchase' })
      .getRawOne();

    // Verifica si se obtuvo un precio promedio
    const averagePrice = parseFloat(result.averagePrice) || 0;
    const totalTransactions = parseInt(result.totalTransactions, 10) || 0;
    const maxPrice = parseFloat(result.maxPrice) || 0;
    const minPrice = parseFloat(result.minPrice) || 0;

    return {
      averagePrice,
      totalTransactions,
      maxPrice,
      minPrice,
      message:
        `El precio promedio de venta para la propiedad con ID ${id} es de ${averagePrice.toFixed(2)}. ` +
        `Este precio se calcula a partir de ${totalTransactions} transacciones de tipo 'sale_purchase'. ` +
        `El precio máximo registrado es ${maxPrice.toFixed(2)} y el precio mínimo registrado es ${minPrice.toFixed(2)}. ` +
        `Este análisis solo incluye transacciones completadas de compra y venta.`,
    };
  }

  // Calcular valoración de la propiedad en base a su área y precio promedio
  async getValuationByPropertyId(id: number): Promise<any> {
    const property = await this.findOne(id);

    if (isNaN(property.area) || property.area <= 0) {
      throw new Error(
        `El área de la propiedad con ID ${id} no es válida: ${property.area}`,
      );
    }

    // Obtiene el precio promedio de los anuncios
    const avgPrice = await this.getAveragePriceByPropertyId(id);

    if (isNaN(avgPrice.averagePrice) || avgPrice.averagePrice <= 0) {
      throw new Error(
        `El precio promedio para la propiedad con ID ${id} no es válido: ${avgPrice.averagePrice}`,
      );
    }

    const valuation = property.area * avgPrice.averagePrice;

    if (isNaN(valuation) || valuation <= 0) {
      throw new Error(
        `La valoración calculada para la propiedad con ID ${id} es inválida: ${valuation}`,
      );
    }

    return {
      ownerName: property.owner_name,
      address: property.address,
      valuation,
      area: property.area,
      averagePrice: avgPrice.averagePrice,
      totalListings: avgPrice.totalListings,
      maxPrice: avgPrice.maxPrice,
      minPrice: avgPrice.minPrice,
      message: `La valoración de la propiedad con ID ${id} se calcula tomando en cuenta un área de ${property.area} m² y un precio promedio de ${avgPrice.averagePrice.toFixed(2)} por metro cuadrado, basado en un total de ${avgPrice.totalListings} anuncios activos. El precio máximo registrado es ${avgPrice.maxPrice.toFixed(2)} y el mínimo es ${avgPrice.minPrice.toFixed(2)}.`,
    };
  }

  // Obtener precio promedio por sector con información adicional
  async getAveragePriceBySector(sector: string): Promise<any> {
    const result = await this.listingsRepository
      .createQueryBuilder('listing')
      .select('AVG(listing.price)', 'averagePrice')
      .addSelect('COUNT(listing.id)', 'totalListings')
      .addSelect('MAX(listing.price)', 'maxPrice')
      .addSelect('MIN(listing.price)', 'minPrice')
      .innerJoin('listing.property', 'property')
      .where('property.sector = :sector', { sector })
      .getRawOne();

    const averagePrice = parseFloat(result.averagePrice) || 0;
    const totalListings = parseInt(result.totalListings, 10) || 0;
    const maxPrice = parseFloat(result.maxPrice) || 0;
    const minPrice = parseFloat(result.minPrice) || 0;

    return {
      averagePrice,
      totalListings,
      maxPrice,
      minPrice,
      message:
        `El precio promedio en el sector '${sector}' es de ${averagePrice.toFixed(2)}. ` +
        `Este precio se calcula a partir de ${totalListings} anuncios activos. ` +
        `El precio máximo registrado es ${maxPrice.toFixed(2)} y el precio mínimo es ${minPrice.toFixed(2)}.`,
    };
  }
  //Obtener distribucion por sector
  async getDistributionBySector(): Promise<any> {
    const result = await this.listingsRepository
      .createQueryBuilder('listing')
      .select('property.sector', 'sector')
      .addSelect('COUNT(listing.id)', 'totalListings')
      .addSelect('AVG(listing.price)', 'averagePrice')
      .innerJoin('listing.property', 'property')
      .groupBy('property.sector')
      .getRawMany();

    return result.map((sectorData) => ({
      sector: sectorData.sector,
      totalProperties: sectorData.totalListings,
      averagePrice: parseFloat(sectorData.averagePrice) || 0,
      totalListings: parseInt(sectorData.totalListings, 10) || 0,
    }));
  }
  //Genero estadisticas por el tipo de propiedad
  async getStatisticsByPropertyType(): Promise<any> {
    const result = await this.listingsRepository
      .createQueryBuilder('listing')
      .select('listing.property_type', 'propertyType')
      .addSelect('COUNT(listing.id)', 'totalCount')
      .groupBy('listing.property_type')
      .getRawMany();

    return result.map((item) => ({
      propertyType: item.propertyType,
      totalCount: parseInt(item.totalCount, 10),
      description: `Cantidad total de propiedades del tipo '${item.propertyType}'`,
    }));
  }

  //Demuestra cuales son los sectores mas caros
  async getHighestAveragePrice(): Promise<any> {
    //Lo hice en sql como se recomendo en challenge
    const query = `
      SELECT 
        "listing"."property_type" AS "propertyType", 
        "property"."sector" AS "sector", 
        AVG("listing"."price") AS "averagePrice", 
        STDDEV("listing"."price") AS "priceStdDev", 
        COUNT("listing"."id") AS "totalProperties", 
        AVG("listing"."price" / "property"."area") AS "pricePerSquareMeter"
      FROM 
        "listings" "listing"
      INNER JOIN 
        "properties" "property" 
        ON "property"."id" = "listing"."property_id"
      GROUP BY 
        "listing"."property_type", "property"."sector"
      ORDER BY 
        "averagePrice" DESC;
    `;

    try {
      const result = await this.listingsRepository.query(query);

      const groupedResults = result.reduce((acc, item) => {
        if (!acc[item.sector]) {
          acc[item.sector] = [];
        }

        acc[item.sector].push({
          propertyType: item.propertyType,
          averagePrice: parseFloat(item.averagePrice),
          priceStdDev: parseFloat(item.priceStdDev),
          totalProperties: parseInt(item.totalProperties),
          pricePerSquareMeter: parseFloat(item.pricePerSquareMeter),
        });

        return acc;
      }, {});

      return groupedResults;
    } catch (error) {
      console.error('Error al obtener los resultados:', error);
      throw new Error('Error al obtener los resultados');
    }
  }
}
