import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingStatus } from './enums/listing-status.enum';
import { PropertyType } from './enums/property-type.enum';
import { Sector } from 'src/properties/enums/sector.enum';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Controller('listings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  // Crear un nuevo listado
  @Post()
  @Roles(Role.ADMIN, Role.USER)
  async create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  // Obtener todos los listados con paginación y filtros
  @Get()
  @Roles(Role.ADMIN, Role.USER)
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
  @Roles(Role.ADMIN, Role.USER)
  async findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  // Actualizar un listado específico por ID
  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  async update(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return this.listingsService.update(+id, updateListingDto);
  }

  // Eliminar un listado específico por ID
  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  async remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }

  // Obtener los listados de un usuario
  @Get('user/:userId')
  @Roles(Role.ADMIN, Role.USER)
  async findAllByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.listingsService.findAllByUserId(+userId, page, pageSize);
  }

  // Obtener los listados de una propiedad
  @Get('property/:propertyId')
  @Roles(Role.ADMIN, Role.USER)
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
  @Roles(Role.ADMIN)
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
