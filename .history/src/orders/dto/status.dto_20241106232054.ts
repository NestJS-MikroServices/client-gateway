import { IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/orde'


export class StatusDto {

     @IsOptional()
     status: OrderStatus;
}