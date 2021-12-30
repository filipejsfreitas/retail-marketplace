import 'dotenv/config';
import 'reflect-metadata';
import { App } from './app';
import { CONTROLLERS } from './controllers';

const app = new App(CONTROLLERS);
app.init();
app.listen();
