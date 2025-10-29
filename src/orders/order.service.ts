// src/orders/order.service.ts
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(userId: number, productId: number, quantity: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const totalPrice = product.price * quantity;

    const order = this.orderRepository.create({
      user,
      product,
      quantity,
      totalPrice,
    });

    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['user', 'product'],
    });
  }

  async findOrdersByUser(userId: number) {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  // ✅ Delete order by user (only their own)
  async deleteOrder(userId: number, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.user.id !== userId) {
      throw new ForbiddenException('You cannot delete this order');
    }

    await this.orderRepository.remove(order);
    return { message: '🗑️ Order removed successfully' };
  }
}
