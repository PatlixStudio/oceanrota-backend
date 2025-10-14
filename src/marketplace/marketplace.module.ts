import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceController } from './marketplace.controller';
import { MarketplaceService } from './marketplace.service';
import { Listing } from './entities/listing.entity';
import { Engine } from './entities/engine.entity';
import { Vessel } from './entities/vessel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Listing, Vessel, Engine]),
  ],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule { }