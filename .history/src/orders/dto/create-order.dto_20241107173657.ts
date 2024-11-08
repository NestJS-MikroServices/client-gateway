import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class CreateOrderDto {

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type( () => OrderItemDto )
  items: OrderItemDto []
}

  /*@IsNumber()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum( OrderStatusList, {
    message: `Possible Status Valid are ${OrderStatusList}`
  } )
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}*/
