import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  migrations: {
    extension: 'js',
    directory: '../infra/database/migrations',
  },
  seeds: {
    directory: '../infra/database/seeds',
    extension: 'js',
  },
};

export default knexConfig;
