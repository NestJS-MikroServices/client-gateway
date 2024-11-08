import { PaginationDto } from "src/common";

export class OrderPaginationDto extends PaginationDto {

     @IsOptional()
     status: OrderStatus
} 