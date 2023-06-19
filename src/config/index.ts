import dotenv from 'dotenv';
import { validate } from './env.validation';

dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  pgHost: process.env.PGHOST,
  pgPort: process.env.PGPORT,
  pgUser: process.env.PGUSER,
  pgPassword: process.env.PGPASSWORD,
  pgDatabase: process.env.PGDATABASE,
  jwtSecret: process.env.JWT_SECRET ?? 'secret',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
};

validate(config);

export default config;
