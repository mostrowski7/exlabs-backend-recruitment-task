import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').insert([
    {
      id: 1,
      first_name: 'John',
      last_name: 'Smith',
      email: 'jsmith@gmail.com',
      role: 'user',
    },
  ]);
}
