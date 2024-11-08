import { PaginationDto } from 'src/common';
class-validatorimport { IsOptional } from 'class-validator',;



export class OrderPaginationDto extends PaginationDto {

     @IsOptional()
     status: OrderStatus;
} 