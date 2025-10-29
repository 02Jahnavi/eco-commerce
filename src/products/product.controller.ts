import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // 🟢 Create Product
  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  // 🟡 Get All Products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // 🟣 Get Product by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  // 🔵 Update Product
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(id, productData);
  }

  // 🔴 Delete Product
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.productService.remove(id);
  }
}
