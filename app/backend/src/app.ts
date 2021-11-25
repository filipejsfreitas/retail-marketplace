process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@/databases/mongodb';
import { errorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

export class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(controllers: Function[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(controllers);
    this.initializeSwagger(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }
  
  private connectToDatabase() {
    if (this.env !== 'production') {
      mongoose.set('debug', true);
    }

    mongoose.connect(dbConnection.url, dbConnection.options as mongoose.ConnectOptions)
      .then(() => logger.info('Connected to the database.'))
      .catch(e => logger.error('Error connecting to the database.'));
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(controllers: Function[]) {
    require('class-transformer')['classToPlain'] = function (obj: any)  {
      return JSON.parse(JSON.stringify(obj));
    };

    useExpressServer(this.app, {
      cors: {
        origin: config.get('cors.origin'),
        credentials: config.get('cors.credentials'),
      },
      controllers: controllers,
      defaultErrorHandler: false,
    });
  }

  private initializeSwagger(controllers: Function[]) {
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const routingControllersOptions = {
      controllers: controllers,
    };

    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: null,
        title: 'Retail Marketplace API',
        version: '1.0.0',
      },
    });

    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
