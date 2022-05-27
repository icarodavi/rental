import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  handle(request: Request, response: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    try {
      const all = listCategoriesUseCase.execute();
      return response.status(200).json(all);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { ListCategoriesController };
