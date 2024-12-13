import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from '../listings/entities/listing.entity';
import { Property } from '../properties/entities/property.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { UserWithoutSensitiveData } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  // Crear un usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  // Obtener todos los usuarios sin datos sensibles
  async findAll(): Promise<UserWithoutSensitiveData[]> {
    const users = await this.userRepository.find();

    // Excluir datos sensibles (password, email)
    return users.map((user) => {
      const { password, email, ...userWithoutSensitiveData } = user;
      return userWithoutSensitiveData;
    });
  }

  // Obtener un usuario por su ID
  async findOne(id: number): Promise<UserWithoutSensitiveData> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Excluir datos sensibles (password, email)
    const { password, email, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  }
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutSensitiveData> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);

    const { password, email, ...userWithoutSensitiveData } = user;

    return userWithoutSensitiveData;
  }

  // Eliminar un usuario por su ID
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Eliminar las listings asociadas al usuario antes de eliminar al usuario
    await this.listingRepository.delete({ user: { id } });

    await this.userRepository.delete(id);
  }

  // Obtener anuncios de un usuario con la propiedad asociada
  async getUserListings(id: number): Promise<Listing[]> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.listingRepository
      .createQueryBuilder('l')
      .innerJoinAndSelect('l.property', 'p')
      .where('l.user_id = :userId', { userId: id })
      .getMany();
  }

  // Obtener propiedades de un usuario
  async getUserProperties(id: number): Promise<Property[]> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Obtener propiedades y los datos de los usuarios de las listings
    return this.propertyRepository
      .createQueryBuilder('p')
      .innerJoin('p.listings', 'l', 'l.user_id = :userId', { userId: id })
      .leftJoinAndSelect('l.user', 'user')
      .getMany();
  }

  // Obtener transacciones de un usuario
  async getUserTransactions(id: number): Promise<Transaction[]> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.transactionRepository
      .createQueryBuilder('t')
      .innerJoin('t.user', 'u', 'u.id = :userId', { userId: id })
      .innerJoin('t.listing', 'l', 'l.id = t.listing_id')
      .innerJoin('t.property', 'p', 'p.id = t.property_id')
      .addSelect(['l', 'p'])
      .getMany();
  }
}
