import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './enums/transaction-type.enum';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  // Obtener todas las transacciones con filtros y paginación
  @Get()
  @Roles(Role.ADMIN, Role.USER)
  async findAll(
    @Query('page') page: number = 1, // Página actual, por defecto es 1
    @Query('limit') limit: number = 10, // Límite de resultados por página, por defecto es 10
    @Query('startDate') startDate: string, // Filtro de fecha de inicio
    @Query('endDate') endDate: string, // Filtro de fecha de fin
    @Query('propertyId') propertyId: number, // Filtro por propiedad
    @Query('userId') userId: number, // Filtro por usuario
    @Query('type') type: string, // Filtro por tipo de transacción
    @Query('minPrice') minPrice: number, // Filtro por precio mínimo
    @Query('maxPrice') maxPrice: number, // Filtro por precio máximo
  ) {
    const filters = {
      startDate,
      endDate,
      propertyId,
      userId,
      type,
      minPrice,
      maxPrice,
    };

    // Llamar al servicio para obtener las transacciones con los filtros y la paginación
    return this.transactionsService.findAll(page, limit, filters);
  }

  // Obtener una transacción por ID
  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  // Actualizar una transacción
  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  // Eliminar una transacción
  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
  // Generar Tendencias
  @Get('/order/trends')
  @Roles(Role.ADMIN)
  async getTrends(
    @Query('type') type: TransactionType,
    @Query('groupBy') groupBy: 'month' | 'year',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query() filters: any,
  ) {
    // Validación de filtros
    if (!Object.values(TransactionType).includes(type)) {
      throw new BadRequestException('Invalid transaction type');
    }

    if (groupBy !== 'month' && groupBy !== 'year') {
      throw new BadRequestException('Invalid groupBy value');
    }

    return this.transactionsService.getTrends(
      type,
      groupBy,
      page,
      limit,
      filters,
    );
  }
}
