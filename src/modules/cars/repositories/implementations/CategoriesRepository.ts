import { Repository } from "typeorm";

import AppDataSource from "../../../../database";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  public repository: Repository<Category>;
  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: [{ name }],
    });

    return category;
  }
}

export { CategoriesRepository };
