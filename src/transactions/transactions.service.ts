import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Property } from 'src/properties/entities/property.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, filters: any = {}) {
    const skip = (page - 1) * limit;

    const queryBuilder = this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.property', 'property')
      .leftJoinAndSelect('transaction.user', 'user')
      .skip(skip)
      .take(limit);

    if (filters.startDate && filters.endDate) {
      queryBuilder.andWhere(
        'transaction.created_at BETWEEN :startDate AND :endDate',
        {
          startDate: filters.startDate,
          endDate: filters.endDate,
        },
      );
    }

    if (filters.propertyId) {
      queryBuilder.andWhere('transaction.property_id = :propertyId', {
        propertyId: filters.propertyId,
      });
    }

    if (filters.userId) {
      queryBuilder.andWhere('transaction.user_id = :userId', {
        userId: filters.userId,
      });
    }

    if (filters.type) {
      queryBuilder.andWhere('transaction.type = :type', {
        type: filters.type,
      });
    }

    if (filters.minPrice && filters.maxPrice) {
      queryBuilder.andWhere(
        'transaction.price BETWEEN :minPrice AND :maxPrice',
        {
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        },
      );
    }

    queryBuilder.orderBy('transaction.created_at', 'DESC');

    const [transactions, total] = await queryBuilder.getManyAndCount();

    const propertiesMap = new Map<number, any>();

    transactions.forEach((transaction) => {
      const propertyId = transaction.property.id;

      const { password, ...userWithoutPassword } = transaction.user;

      if (!propertiesMap.has(propertyId)) {
        propertiesMap.set(propertyId, {
          property: {
            id: transaction.property.id,
            address: transaction.property.address,
            area: transaction.property.area,
            sector: transaction.property.sector,
            owner_name: transaction.property.owner_name,
            created_at: transaction.property.created_at,
          },
          user: userWithoutPassword,
          transactions: [
            {
              id: transaction.id,
              price: transaction.price,
              type: transaction.type,
              date: transaction.created_at,
              created_at: transaction.created_at,
            },
          ],
        });
      } else {
        const existingProperty = propertiesMap.get(propertyId);
        existingProperty.transactions.push({
          id: transaction.id,
          price: transaction.price,
          type: transaction.type,
          date: transaction.created_at,
          created_at: transaction.created_at,
        });
      }
    });

    const propertiesWithTransactions = Array.from(propertiesMap.values());

    return {
      data: propertiesWithTransactions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Crear Transacción
  async create(createTransactionDto: CreateTransactionDto) {
    const { price, type, property_id, user_id } = createTransactionDto;

    // Validación de precio
    if (isNaN(price) || price <= 0) {
      throw new BadRequestException(
        'El precio de la transacción debe ser un valor positivo.',
      );
    }

    // Verificar que la propiedad existe
    const property = await this.propertyRepository.findOne({
      where: { id: property_id },
    });
    if (!property) {
      throw new NotFoundException(`Property with ID ${property_id} not found`);
    }

    // Verificar que el usuario existe
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // Crear la transacción
    const transaction = this.transactionRepository.create({
      price,
      type,
      property: { id: property_id },
      user: { id: user_id },
    });

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  // Obtener una transacción por ID
  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['property', 'user'], // Cargamos las relaciones de propiedad y usuario
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  // Actualizar Transacción
  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const { price, type } = updateTransactionDto;

    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    // Actualizar valores
    transaction.price = price ?? transaction.price;
    transaction.type = type ?? transaction.type;

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  // Eliminar Transacción
  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    await this.transactionRepository.remove(transaction);
    return { message: `Transaction with ID ${id} has been removed` };
  }
}
