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
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get('valuation')
  getValuationAllValuations(
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    return this.propertiesService.getValuationAllValuations(limit, page);
  }

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll(@Query() filters: any) {
    return this.propertiesService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }

  @Get('listings/:id')
  getListingsByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getListingsByPropertyId(+id);
  }

  @Get('transactions/:id')
  getTransactionsByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getTransactionsByPropertyId(+id);
  }

  @Get('average_price/:id')
  getAveragePriceByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getAveragePriceByPropertyId(+id);
  }

  @Get('price_from_transactions/:id')
  getAverageSalePriceByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getAverageSalePriceByPropertyId(+id);
  }

  @Get('valuation/:id')
  getValuationByPropertyId(@Param('id') id: string) {
    return this.propertiesService.getValuationByPropertyId(+id);
  }

  @Get('sector/average_price/:sector')
  getAveragePriceBySector(@Param('sector') sector: string) {
    return this.propertiesService.getAveragePriceBySector(sector);
  }
}
