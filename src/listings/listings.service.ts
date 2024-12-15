import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Property } from '../properties/entities/property.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un nuevo anuncio
  async create(createListingDto: CreateListingDto) {
    const { price, status, property_type, property_id, user_id } =
      createListingDto;

    const [user, property] = await Promise.all([
      this.userRepository.findOne({
        where: { id: user_id },
        select: ['id', 'username', 'email'],
      }),
      this.propertyRepository.findOne({ where: { id: property_id } }),
    ]);

    if (!user && !property) {
      throw new NotFoundException(
        `Neither User with id ${user_id} nor Property with id ${property_id} exist`,
      );
    }

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }

    if (!property) {
      throw new NotFoundException(`Property with id ${property_id} not found`);
    }

    const listing = this.listingRepository.create({
      price,
      status,
      property_type,
      property,
      user,
    });

    return await this.listingRepository.save(listing);
  }

  // Obtener todos los anuncios con paginación y filtros
  async findAll(page: number = 1, pageSize: number = 10, filters: any = {}) {
    const queryBuilder = this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.property', 'property')
      .leftJoinAndSelect('listing.user', 'user');

    // Seleccionar solo los campos específicos de 'user', omitiendo 'password'
    queryBuilder.addSelect(['user.id', 'user.username', 'user.role']);

    // Filtros de búsqueda (por estado, sector, precio, etc.)
    if (filters.status) {
      queryBuilder.andWhere('listing.status = :status', {
        status: filters.status,
      });
    }

    if (filters.property_type) {
      queryBuilder.andWhere('listing.property_type = :property_type', {
        property_type: filters.property_type,
      });
    }

    if (filters.min_price) {
      queryBuilder.andWhere('listing.price >= :min_price', {
        min_price: filters.min_price,
      });
    }

    if (filters.max_price) {
      queryBuilder.andWhere('listing.price <= :max_price', {
        max_price: filters.max_price,
      });
    }

    if (filters.sector) {
      queryBuilder.andWhere('property.sector = :sector', {
        sector: filters.sector,
      });
    }

    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    const [result, total] = await queryBuilder.getManyAndCount();

    return {
      data: result,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // Obtener todos los anuncios de un usuario
  async findAllByUserId(
    userId: number,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const queryBuilder = this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.property', 'property')
      .leftJoinAndSelect('listing.user', 'user');

    queryBuilder.addSelect(['user.id', 'user.username', 'user.role']);

    queryBuilder.where('listing.user_id = :userId', { userId }); // Corregido a 'user_id'
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    const [result, total] = await queryBuilder.getManyAndCount();

    return {
      data: result,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // Obtener todos los anuncios de una propiedad
  async findAllByPropertyId(
    propertyId: number,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const queryBuilder = this.listingRepository
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.property', 'property')
      .leftJoinAndSelect('listing.user', 'user');

    queryBuilder.addSelect(['user.id', 'user.username', 'user.role']);

    queryBuilder.where('listing.property_id = :propertyId', { propertyId }); // Corregido a 'property_id'
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    const [result, total] = await queryBuilder.getManyAndCount();

    return {
      data: result,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  // Obtener un anuncio por su ID con relaciones
  async findOne(id: number): Promise<any> {
    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['user', 'property'], // Incluir relaciones
    });

    if (!listing) {
      throw new NotFoundException(`Listing with ID ${id} not found`);
    }

    const { user, property, ...filteredListing } = listing;

    return {
      ...filteredListing,
      user: user
        ? {
            id: user.id,
            name: user.username,
            email: user.email,
          }
        : null,
      property: property
        ? {
            id: property.id,
            address: property.address,
            owner_name: property.owner_name,
          }
        : null,
    };
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    const { price, status, property_type } = updateListingDto;

    const listing = await this.listingRepository.findOne({
      where: { id },
      relations: ['user', 'property'],
    });

    if (!listing) {
      throw new NotFoundException(`Listing with id ${id} not found`);
    }

    listing.price = price;
    listing.status = status;
    listing.property_type = property_type;

    const updatedListing = await this.listingRepository.save(listing);

    const { user, ...filteredListing } = updatedListing;
    return {
      ...filteredListing,
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
    };
  }

  // Eliminar un anuncio por su ID
  async remove(id: number) {
    const listing = await this.listingRepository.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundException(`Listing with id ${id} not found`);
    }

    return await this.listingRepository.remove(listing);
  }

  //Histogramas
  async getListingsWithHistogramData(
    page: number,
    limit: number,
    propertiesPerRange: number,
    status?: string,
    property_type?: string,
  ): Promise<any> {
    const queryBuilder = this.listingRepository
      .createQueryBuilder('Listing')
      .select('Listing.id', 'Listing_id')
      .addSelect('Listing.price', 'Listing_price')
      .addSelect('Listing.status', 'Listing_status')
      .addSelect('Listing.property_type', 'Listing_property_type')
      .addSelect('Listing.created_at', 'Listing_created_at');

    if (status) {
      queryBuilder.andWhere('Listing.status = :status', { status });
    }

    if (property_type) {
      queryBuilder.andWhere('Listing.property_type = :property_type', {
        property_type,
      });
    }

    const allListings = await queryBuilder.getRawMany();

    const sortedListings = allListings.sort(
      (a, b) => parseFloat(a.Listing_price) - parseFloat(b.Listing_price),
    );

    let histogramData = [];
    let currentBucket = [];
    let currentRangeStart = parseFloat(sortedListings[0].Listing_price);

    for (let i = 0; i < sortedListings.length; i++) {
      currentBucket.push(sortedListings[i]);

      if (
        currentBucket.length >= propertiesPerRange ||
        i === sortedListings.length - 1
      ) {
        const rangeEnd = parseFloat(sortedListings[i].Listing_price);

        histogramData.push({
          price_range: `${currentRangeStart.toFixed(2)} - ${rangeEnd.toFixed(2)}`,
          count: currentBucket.length,
          listings: currentBucket,
        });

        currentBucket = [];
        if (i < sortedListings.length - 1) {
          currentRangeStart = parseFloat(sortedListings[i + 1].Listing_price);
        }
      }
    }

    const totalPages = Math.ceil(histogramData.length / limit);
    const pageData = histogramData.slice((page - 1) * limit, page * limit);

    return {
      histogram: pageData,
      totalPages,
      currentPage: page.toString(),
    };
  }
}
