import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import {PRODUCT_SERVICE} from "../config";
import {ClientProxy} from '@nestjs/microservices';
import {PaginationDto} from '../common';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(){
    return "CREAR PRODUCTO"
  }

  @Get()
  findAllProducts( @Query() paginationDto: PaginationDto ){
    const { page, limit } = paginationDto;
    return this.productsClient.send({ cmd: 'find_all_products' }, { page, limit })
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
