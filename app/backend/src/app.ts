import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage, useExpressServer } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { dbConnection } from './databases/mongodb';
import { errorMiddleware } from './middlewares/express/error.middleware';
import { logger, stream } from './utils/logger';
import { AppLocalStrategy } from './middlewares/passport/appLocalStrategy.middleware';
import { AppJwtStrategy } from './middlewares/passport/jwtStrategy.middleware';
import { authMiddleware } from './middlewares/routing-controllers/auth.middleware';

export class App {
  private readonly app: express.Application;
  private readonly port: string | number;
  private readonly env: string;

  private readonly controllers: Function[];

  constructor(controllers: Function[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';
    this.controllers = controllers;
  }

  public init() {
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializePassport();
    this.initializeRoutes();
    this.initializeSwagger();
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

    mongoose
      .connect(dbConnection.url, dbConnection.options as mongoose.ConnectOptions)
      .then(() => logger.info('Connected to the database.'))
      .catch(_ => logger.error('Error connecting to the database.'));
  }

  private initializeMiddlewares() {
    this.app.use(morgan(process.env.LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static('./public'));
  }

  private initializePassport() {
    passport.use('local', AppLocalStrategy);
    // passport.use(AppGoogleStrategy);
    passport.use('jwt', AppJwtStrategy);

    this.app.use(passport.initialize());
  }

  private initializeRoutes() {
    const classToPlain = require('class-transformer')['classToPlain'];
    require('class-transformer')['classToPlain'] = function (obj: any, options) {
      return JSON.parse(JSON.stringify(obj));
    };

    useExpressServer(this.app, {
      cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: process.env.CORS_CREDENTIALS,
      },
      controllers: this.controllers,
      defaultErrorHandler: false,
      authorizationChecker: authMiddleware,
    });
  }

  private initializeSwagger() {
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    });

    const storage = getMetadataArgsStorage();
    const routingControllerOptions = { controllers: this.controllers };

    const spec = routingControllersToSpec(storage, routingControllerOptions, {
      info: {
        title: 'Retail Marketplace API',
        description: null,
        version: '1.0.0',
      },
      components: {
        schemas,
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    });

    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
