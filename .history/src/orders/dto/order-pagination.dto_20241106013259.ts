import { PaginationDto } from 'src/common';
import { IsOptional } from 'class-validator';



export class OrderPaginationDto extends PaginationDto {

     @IsOptional()
     status: OrderStatus;
} 