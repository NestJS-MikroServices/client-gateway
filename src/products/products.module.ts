import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {envs, PRODUCT_SERVICE} from '../config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsMSHost,
          port: envs.productsMSPort
        }
      }
    ]),
  ],
})
export class ProductsModule {}
