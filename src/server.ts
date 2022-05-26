import express from 'express';
import swaggerUI from 'swagger-ui-express';

import swaggerFile from '../swagger.json';
import { AppDataSource } from './data-source';
import { router } from './routes';

const app = express();
AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

    app.use(router);

    app.listen(3333, () => console.log('Server is running!'));
  })
  .catch((err) => {
    console.log(err);
  });
