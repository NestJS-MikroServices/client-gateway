import { IsOptional } from 'class-validator';
import { OrderStatus } from '..'


export class StatusDto {

     @IsOptional()
     status: OrderStatus;
}