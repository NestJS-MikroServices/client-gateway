import { PaginationDto } from 'src/common';
import { IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/order.enum'


export class OrderPaginationDto extends PaginationDto {

     @IsOptional()
     @IsEnum( OrderStatusList, {
          message: `ORDER STATUS VALID ARE: ${}`
     })
     status: OrderStatus;
} 