import { PaginationDto } from 'src/common';
import { IsOptional } from 'class-validator';
imp


export class OrderPaginationDto extends PaginationDto {

     @IsOptional()
     status: OrderStatus;
} 