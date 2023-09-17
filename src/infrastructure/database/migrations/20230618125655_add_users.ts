import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE users (
            id  SERIAL NOT NULL PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
        DROP TABLE users
    `);
}
