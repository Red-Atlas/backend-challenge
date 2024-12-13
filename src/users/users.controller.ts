import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth-jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todos los usuarios
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Obtener un usuario por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // Actualizar un usuario por ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Eliminar un usuario por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Obtener anuncios de un usuario
  @Get('listings/:id')
  async getUserListings(@Param('id') id: string) {
    const listings = await this.usersService.getUserListings(+id);
    if (!listings || listings.length === 0) {
      throw new NotFoundException(`No listings found for user with ID ${id}`);
    }
    return listings;
  }

  // Obtener propiedades de un usuario
  @Get('properties/:id')
  async getUserProperties(@Param('id') id: string) {
    const properties = await this.usersService.getUserProperties(+id);
    if (!properties || properties.length === 0) {
      throw new NotFoundException(`No properties found for user with ID ${id}`);
    }
    return properties;
  }

  // Obtener transacciones de un usuario
  @Get('/transactions/:id')
  async getUserTransactions(@Param('id') id: string) {
    const transactions = await this.usersService.getUserTransactions(+id);
    if (!transactions || transactions.length === 0) {
      throw new NotFoundException(
        `No transactions found for user with ID ${id}`,
      );
    }
    return transactions;
  }
}
