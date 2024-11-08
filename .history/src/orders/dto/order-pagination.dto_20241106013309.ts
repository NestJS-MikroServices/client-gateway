import { PaginationDto } from 'src/common';
import { IsOptional } from 'class-validator';
import { }


export class OrderPaginationDto extends PaginationDto {

     @IsOptional()
     status: OrderStatus;
} 