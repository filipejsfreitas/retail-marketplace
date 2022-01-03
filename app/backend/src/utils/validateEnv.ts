import { bool, cleanEnv, host, port, str } from 'envalid';
import dotenv from 'dotenv';

export const validateEnv = () => {
  dotenv.config();
  return cleanEnv(process.env, {
    PORT: port({ devDefault: 4000 }),
    NODE_ENV: str({ devDefault: 'development' }),

    MONGODB_HOST: host({ devDefault: 'localhost' }),
    MONGODB_PORT: port({ devDefault: 4000 }),
    MONGODB_USERNAME: str({ default: '' }),
    MONGODB_PASSWORD: str({ default: '' }),
    MONGODB_DATABASE: str({ devDefault: 'retailmarketplace' }),

    SECRET_KEY: str({ devDefault: 'SecretKey' }),
    JWT_ISSUER: str({ devDefault: 'retail-marketplace' }),
    JWT_AUDIENCE: str({ devDefault: 'retail-marketplace' }),

    CORS_ORIGIN: str({ devDefault: '*', default: '*' }),
    CORS_CREDENTIALS: bool({ devDefault: false, default: true }),

    LOG_FORMAT: str({ devDefault: 'dev', default: 'prod' }),
    LOG_DIR: str({ default: './logs' }),
  });
};

export type NodeJSEnvironment = ReturnType<typeof validateEnv>;
