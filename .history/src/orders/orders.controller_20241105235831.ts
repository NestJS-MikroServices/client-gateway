import { Inject, Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { ORDER_SERVICE } from '../config';
import { ClientProxy, RpcException, RpcException, NotFoundException, InternalServerErrorException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto';

import { throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  createOrder( @Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAllOrders(){
    return this.ordersClient.send('findAllOrders', {});
  }

/*
  @Get()
  findAllOrders( @Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.ordersClient.send('findAllOrders', { page, limit });
  }*/
    /*
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {
    try {
        const order = await firstValueFrom(
          this.ordersClient.send('findOneOrder', { id })
      );
    return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }*/

/* ===============================================================*/  

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }).pipe(
          timeout(5000), // Timeout de 5 segundos
          catchError(error => {
            // Aquí manejas diferentes tipos de errores
            if (error.message === 'Order not found') {
              // Si el pedido no se encuentra, lanzas un 404
              return throwError(() => new NotFoundException(`Order with ID ${id} not found`));
            }

            // Otros errores podrían ser manejados aquí
            console.error('Error fetching order:', error);
            return throwError(() => new InternalServerErrorException('Error fetching order'));
          })
        )
      );
      return order;
    } catch (error) {
      // Si ocurre un error fuera del flujo RxJS, lo capturamos aquí
      throw new InternalServerErrorException(error.message || 'Unexpected error');
    }
  }

/*
  @Get(':id')
  async findOrder(@Param('id') id: number) {
    try{
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id })
      );
      return order;
    } catch (e) {
      throw new RpcException(e);
    }
  }*/

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
