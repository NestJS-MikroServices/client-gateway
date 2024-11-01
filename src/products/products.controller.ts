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
import {ClientProxy, RpcException} from '@nestjs/microservices';
import {PaginationDto, RpcCustomExceptionFilter} from '../common';
import {firstValueFrom} from 'rxjs';


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
  async findProduct(@Param('id') id: number){
    try {
      const product= await firstValueFrom(
        this.productsClient.send({ cmd: 'find_product'}, { id })
      );
      return product;
    } catch (e) {
      throw new RpcException(e);
    }
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
