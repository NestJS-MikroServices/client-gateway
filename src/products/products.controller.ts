import {Body, Controller, Delete, Get, Inject, Param, Patch, Post} from '@nestjs/common';
import {PRODUCT_SERVICE} from "../config";
import {ClientProxy} from "@nestjs/microservices";


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly ProductsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(){
    return "CREAR PRODUCTO"
  }

  @Get()
  findAllProducts(){
    return this.ProductsClient.send({ cmd: 'find_all_products' }, {})
  }

  @Get(':id')
  findProduct(@Param('id') id: number){
    return "PRODUCT OK"
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() body: any){
    return "SET PRODUCT OK"
  }

  @Delete(':id')
  removeProduct (){
    return "PRODUCT DESTROYED"
  }
}
