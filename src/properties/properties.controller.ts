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
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('properties')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get('valuation')
  @Roles(Role.ADMIN)
  getValuationAllValuations(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.propertiesService.getValuationAllValuations(limit, page);
  }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll(@Query() filters: any) {
    return this.propertiesService.findAll(filters);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }

  @Get('listings/:id')
  @Roles(Role.ADMIN, Role.USER)
  getListingsByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getListingsByPropertyId(+id);
  }

  @Get('transactions/:id')
  @Roles(Role.ADMIN, Role.USER)
  getTransactionsByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getTransactionsByPropertyId(+id);
  }

  @Get('average_price/:id')
  @Roles(Role.ADMIN, Role.USER)
  getAveragePriceByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getAveragePriceByPropertyId(+id);
  }

  @Get('price_from_transactions/:id')
  @Roles(Role.ADMIN, Role.USER)
  getAverageSalePriceByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getAverageSalePriceByPropertyId(+id);
  }

  @Get('valuation/:id')
  @Roles(Role.ADMIN)
  getValuationByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getValuationByPropertyId(+id);
  }

  @Get('sector/average_price/:sector')
  @Roles(Role.ADMIN)
  getAveragePriceBySector(@Param('sector') sector: string) {
    return this.propertiesService.getAveragePriceBySector(sector);
  }

  @Get('sector/distribution')
  @Roles(Role.ADMIN)
  getDistributionBySector() {
    return this.propertiesService.getDistributionBySector();
  }

  // Endpoint para obtener estadísticas de tipos de propiedades
  @Get('statistics/types')
  @Roles(Role.ADMIN, Role.USER)
  getPropertyTypesStatistics() {
    return this.propertiesService.getStatisticsByPropertyType();
  }

  //  Endpoint para obtener los sectores mas  caros
  @Get('highest/average/price')
  @Roles(Role.ADMIN)
  getHighestAveragePrice() {
    return this.propertiesService.getHighestAveragePrice();
  }
}
