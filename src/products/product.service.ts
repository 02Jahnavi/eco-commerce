import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // 🟢 Create a new product
  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  // 🟡 Get all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // 🟣 Get a single product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  // 🔵 Update a product
  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.update(id, productData);
    const updatedProduct = await this.productRepository.findOne({ where: { id } });
    return updatedProduct!;
  }

  // 🔴 Delete a product
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} deleted successfully` };
  }
}
