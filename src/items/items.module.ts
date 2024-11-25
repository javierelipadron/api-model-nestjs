import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from '../guards/apikey.guard';

@Module({
  controllers: [ItemsController],
  providers: [
    ItemsService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class ItemsModule {}
