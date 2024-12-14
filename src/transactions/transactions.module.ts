import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Listing } from 'src/listings/entities/listing.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Listing, User, Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
