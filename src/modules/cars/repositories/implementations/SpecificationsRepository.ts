import { Repository } from 'typeorm';

import AppDataSource from '../../../../database';
import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({
      where: { name },
    });
    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = await this.repository.create({
      name,
      description,
    });
    await this.repository.save(specification);
  }

  async list(): Promise<Specification[]> {
    const all = await this.repository.find();
    return all;
  }
}

export { SpecificationsRepository };
