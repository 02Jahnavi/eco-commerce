import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';
import { Order } from '../orders/order.entity';
import * as bcrypt from 'bcryptjs';

dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Product, Order],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);

  const hashed = await bcrypt.hash('password', 10);
  const user = userRepo.create({ name: 'Demo User', email: 'demo@example.com', password: hashed });
  await userRepo.save(user);

  const products = [
    { name: 'Blue T-Shirt', description: 'Comfortable cotton t-shirt', price: 499, imageUrl: '' },
    { name: 'Sneakers', description: 'Running shoes', price: 1999, imageUrl: '' },
    { name: 'Backpack', description: 'Travel backpack', price: 1299, imageUrl: '' },
  ];
  for (const p of products) {
    const prod = productRepo.create(p);
    await productRepo.save(prod);
  }

  console.log('Seeded demo user and products');
  process.exit(0);
}

seed().catch(console.error);