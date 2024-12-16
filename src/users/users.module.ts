import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Listing } from 'src/listings/entities/listing.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Listing, Property, Transaction])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
