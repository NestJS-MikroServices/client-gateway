import { Inject, Controller, Get, Post, Body, Query, Param, ParseUUIDPipe } from '@nestjs/common';
import { ORDER_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  createOrder( @Body() createOrderDto: CreateOrderDto ) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll( @Query() orderPaginationDto: OrderPaginationDto ){
    return this.ordersClient.send('findAllOrders', orderPaginationDto });
  }

/*
  @Get()
  findAllOrders( @Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.ordersClient.send('findAllOrders', { page, limit });
  }*/

  @Get(':id')
  async findOne( @Param('id', ParseUUIDPipe ) id: string ) {
    try {
        const order = await firstValueFrom(
          this.ordersClient.send('findOneOrder', { id })
      );
    return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersClient.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersClient.remove(+id);
  }
  */
}
