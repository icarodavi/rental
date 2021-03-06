import { AppError } from "../../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "../CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("#Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "name car",
      description: "description",
      daily_rate: 100,
      license_plate: "abc-123",
      brand: "brand",
      fine_amount: 1000,
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with existent license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "name car",
        description: "description",
        daily_rate: 100,
        license_plate: "abc-123",
        brand: "brand",
        fine_amount: 1000,
        category_id: "category",
      });
      await createCarUseCase.execute({
        name: "name car",
        description: "description",
        daily_rate: 100,
        license_plate: "abc-123",
        brand: "brand",
        fine_amount: 1000,
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "car available",
      description: "description",
      daily_rate: 100,
      license_plate: "abc-123",
      brand: "brand",
      fine_amount: 1000,
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
