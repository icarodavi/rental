import { ICategoryDTO } from '../../repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('#Create a Coupon', () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a coupon', async () => {
    const category: ICategoryDTO = {
      name: 'Category test',
      description: 'Description test',
    };

    await createCategoryUseCase.execute(category);
    const expectTest = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(expectTest).toHaveProperty('id');
  });
});
