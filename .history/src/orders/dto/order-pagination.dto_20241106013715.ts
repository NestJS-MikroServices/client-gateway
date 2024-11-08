import { PaginationDto } from 'src/common';
import { IsOptional, IsEnum } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';

export class OrderPaginationDto extends PaginationDto {

     @IsOptional()
     @IsEnum( OrderStatusList, {
          message: `ORDER STATUS VALID ARE: ${OrderStatusList}`
     })
     status: OrderStatus;
}