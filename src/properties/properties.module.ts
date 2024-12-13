import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Property } from './entities/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from 'src/listings/entities/listing.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Listing, Transaction, User])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
