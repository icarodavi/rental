import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import swaggerFile from '../swagger.json';
import AppDataSource from './data-source';
import { AppError } from './errors/AppError';
import { router } from './routes';
import './shared/container';

const app = express();

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

    app.use(router);

    app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }
        return response.status(500).json({
          status: 'error',
          message: `Internal server error - ${err.message}`,
        });
      }
    );

    app.listen(3333, () => console.log('Server is running!'));
  })
  .catch((err) => {
    console.log(err);
    //
  });
