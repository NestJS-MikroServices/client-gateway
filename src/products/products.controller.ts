import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor( ) {}

  @Post()
  createProduct(){
    return "CREAR PRODUCTO"
  }

  @Get()
  findAllProducts(){
    return "ALL PRODUCT OK"
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
