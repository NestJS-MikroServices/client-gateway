import { PaginationDto } from "src/common";

export class OrderPaginationDto extends PaginationDto {

     @IsOpti
     status: OrderStatus;
} 