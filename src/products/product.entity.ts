import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Make sure NOT NULL and has a default value to fix your error
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
