import { IsOptional } from 'class-validator';



export class StatusDto {

     @IsOptional()
     status: OrderStatus;
}