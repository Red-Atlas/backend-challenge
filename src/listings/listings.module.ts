import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Transaction } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Listing, Transaction, User])],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
