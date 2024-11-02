import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) { return this.ordersClient.send({'createOrder'}, createOrderDto);
  }

  @Get()
  findAllOrders(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return this.ordersClient.send({'findAllOrders'}, { page, limit });
  }

  @Get(':id')
  async findOrder(@Param('id') id: number) {
    try{
      const order = await firstValueFrom(
        this.ordersClient.send({'findOneOrder'}, { id })
      );
      return order
    }
    return this.ordersClient.findOne(+id);
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
