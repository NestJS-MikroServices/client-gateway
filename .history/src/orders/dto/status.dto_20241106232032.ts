import { IsOptional } from 'class-validator';
import {}


export class StatusDto {

     @IsOptional()
     status: OrderStatus;
}