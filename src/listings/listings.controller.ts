import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingStatus } from './enums/listing-status.enum';
import { PropertyType } from './enums/property-type.enum';
import { Sector } from 'src/properties/enums/sector.enum';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  // Crear un nuevo listado
  @Post()
  async create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  // Obtener todos los listados con paginación y filtros
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('status') status?: ListingStatus,
    @Query('property_type') propertyType?: PropertyType,
    @Query('min_price') minPrice?: number,
    @Query('max_price') maxPrice?: number,
    @Query('sector') sector?: Sector,
  ) {
    const filters = {
      status,
      property_type: propertyType,
      min_price: minPrice,
      max_price: maxPrice,
      sector,
    };

    return this.listingsService.findAll(page, pageSize, filters);
  }

  // Obtener un listado específico por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  // Actualizar un listado específico por ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(+id, updateListingDto);
  }

  // Eliminar un listado específico por ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }

  // Obtener los listados de un usuario
  @Get('user/:userId')
  async findAllByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.listingsService.findAllByUserId(+userId, page, pageSize);
  }

  // Obtener los listados de una propiedad
  @Get('property/:propertyId')
  async findAllByPropertyId(
    @Param('propertyId') propertyId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.listingsService.findAllByPropertyId(
      +propertyId,
      page,
      pageSize,
    );
  }

  @Get('histogram/price-range')
  async getListingsWithHistogramData(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1,
    @Query('propertiesPerRange') propertiesPerRange: number = 10,
    @Query('status') status?: string,
    @Query('property_type') property_type?: string,
  ) {
    return this.listingsService.getListingsWithHistogramData(
      page,
      limit,
      propertiesPerRange,
      status,
      property_type,
    );
  }
}
