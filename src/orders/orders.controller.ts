import { Inject, Controller, Get, Post, Patch, Body, Query, Param, ParseUUIDPipe } from '@nestjs/common';
import {NATS_SERVICE, ORDER_SERVICE} from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', orderPaginationDto)
      )
      return orders;
    } catch (e){
      throw new RpcException(e);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id })
      );
      return order;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  @Get(':status')
  async findStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      //return { statusDto, paginationDto };
      return this.client.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (e) {
      throw new RpcException(e);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return await this.client.send('changeOrderStatus', { id, status: statusDto.status });
    } catch (e) {
      throw new RpcException(e);
    }
  }

  /*
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.remove(+id);
  }
  */
}
