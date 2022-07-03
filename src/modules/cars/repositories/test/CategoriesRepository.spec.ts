import { CreateCategoryUseCase } from "../../useCases/createCategory/CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "../in-memory/CategoriesRepositoryInMemory";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoriesUseCase: CreateCategoryUseCase;

describe("#Category Use Case", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoriesUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new Category", async () => {
    const category = {
      name: "Category test",
      description: "Description test",
    };
    await createCategoriesUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(categoryCreated).toHaveProperty("id");
  });
});
