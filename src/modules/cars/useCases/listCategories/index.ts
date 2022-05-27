import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesControllers } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const categoriesRepository = new CategoriesRepository();

const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

const listCategoriesController = new ListCategoriesControllers(
  listCategoriesUseCase
);

export { listCategoriesController };
