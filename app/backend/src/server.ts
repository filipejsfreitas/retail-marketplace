process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import 'reflect-metadata';
import { App } from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import { validateEnv } from '@utils/validateEnv';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { ProposalController } from './controllers/proposal.controller';
import { AddressController } from './controllers/address.controller';

validateEnv();

const app = new App([AuthController, IndexController, UsersController, CategoryController, ProductController, ProposalController, AddressController]);
app.listen();
