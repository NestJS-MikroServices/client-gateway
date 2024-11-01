import {
  Body,
  Controller,
  Delete,
  Get,
  Inject, InternalServerErrorException,
  Param, ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import {PRODUCT_SERVICE} from "../config";
import {ClientProxy, RpcException} from '@nestjs/microservices';
import {PaginationDto, RpcCustomExceptionFilter} from '../common';
import {catchError, firstValueFrom, lastValueFrom, Observable, tap} from 'rxjs';
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {any} from "joi";
import * as console from "console";
import {response} from "express";


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct( @Body() createdProductDto: CreateProductDto ){
    return this.productsClient.send({cmd: 'create_product'}, createdProductDto );
  }

  @Get()
  findAllProducts( @Query() paginationDto: PaginationDto ){
    const { page, limit } = paginationDto;
    return this.productsClient.send({cmd: 'find_all_products'}, { page, limit })
  }

  @Get(':id')
  async findProduct(@Param('id') id: number){
    try {
      const product= await firstValueFrom(
        this.productsClient.send({cmd: 'find_product'}, { id })
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
        this.productsClient.send({cmd: 'set_product'}, {
          id,
          ...updateProductDto
        })
      );
    } catch (e){
      throw new RpcException(e)
      }
  }

  @Delete(':id')
  removeProduct (){
    return "PRODUCT DESTROYED"
  }
}
