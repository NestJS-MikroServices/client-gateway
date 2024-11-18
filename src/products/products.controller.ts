import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {NATS_SERVICE} from "../config";
import {ClientProxy, RpcException} from '@nestjs/microservices';
import {PaginationDto} from '../common';
import {catchError, firstValueFrom, lastValueFrom} from 'rxjs';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  createProduct( @Body() createdProductDto: CreateProductDto ){
    return this.client.send({cmd: 'create_product'}, createdProductDto );
  }

  @Get()
  findAllProducts( @Query() paginationDto: PaginationDto ){
    const { page, limit } = paginationDto;
    return this.client.send({cmd: 'find_all_products'}, { page, limit })
  }

  @Get(':id')
  async findProduct(@Param('id') id: number){
    try {
      const product = await firstValueFrom(
        this.client.send({cmd: 'find_product'}, { id })
      );
      return product;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto ){
    //const { name, price } = updateProductDto;
    //console.log('Datos a enviar al microservicio:', { id, ...updateProductDto });
    try {
      return await lastValueFrom(
        this.client.send({cmd: 'set_product'}, {
          id,
          ...updateProductDto
        })
      );
    } catch (e){
      throw new RpcException(e)
      }
  }

  @Delete(':id')
  removeProduct (@Param('id', ParseIntPipe ) id: number){
    return this.client.send({cmd: 'eliminate_product'}, {id}).pipe(
      catchError((e) => {
        throw new RpcException(e);
      })
    );
  }
}
