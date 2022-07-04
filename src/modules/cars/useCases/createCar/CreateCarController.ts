import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const {
      name,
      description,
      daily_rate,
      license_plate,
      brand,
      fine_amount,
      category_id,
    } = request.body;
    try {
      const car = await createCarUseCase.execute({
        name,
        description,
        daily_rate,
        license_plate,
        brand,
        fine_amount,
        category_id,
      });
      return response.status(201).json(car);
    } catch (error) {
      return response.status(400).json(error);
    }
  }
}
export { CreateCarController };
