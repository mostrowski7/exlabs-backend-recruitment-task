import dotenv from 'dotenv';
import { validate } from './env.validation';

dotenv.config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};

validate(config);

export default config;
