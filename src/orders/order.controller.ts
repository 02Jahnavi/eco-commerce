import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // ✅ USER: Create an order
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.ordersService.createOrder(userId, body.productId, body.quantity);
  }

  // ✅ ADMIN: Get all orders
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // ✅ USER: Get only current user's orders
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyOrders(@Request() req: any) {
    const userId = req.user.userId;
    return this.ordersService.findOrdersByUser(userId);
  }

  // ✅ USER: Delete specific order
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req: any) {
    const userId = req.user.userId;
    return this.ordersService.deleteOrder(userId, id);
  }
}
