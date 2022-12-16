import { IOrdersRepository } from '@modules/orders/repositories/IOrdersRepository';
import { IOrderRepositoryCreateOrder } from '@modules/orders/dtos/IOrderRepositoryCreateOrder';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';

export class OrderRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async createOrder({
    user,
    products,
  }: IOrderRepositoryCreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      user,
      order_purchase: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_purchase', 'customer'],
    });

    return order;
  }
}
