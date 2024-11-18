import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from '../transports/nats.module';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {envs, NATS_SERVICE, PRODUCT_SERVICE} from '../config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule
    /*name: PRODUCT_SERVICE,
    transport: Transport.TCP,
    options: {
      host: envs.productsMSHost,
      port: envs.productsMSPort
    }*/
  ],
})
export class ProductsModule {}
