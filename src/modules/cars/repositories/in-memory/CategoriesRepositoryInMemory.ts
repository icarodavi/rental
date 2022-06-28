import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICategoryDTO } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
  list(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };