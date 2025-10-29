import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, User])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
