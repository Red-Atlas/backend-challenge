import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';
import { Listing } from 'src/listings/entities/listing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, User, Transaction, Listing])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
