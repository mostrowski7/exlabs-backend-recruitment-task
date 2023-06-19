import { Service } from 'typedi';
import { DatabaseError, QueryResult } from 'pg';
import { plainToInstance } from 'class-transformer';
import DatabaseService from '../../infra/database/database.service';
import CreateUserDto from '../../interfaces/dtos/create-user.dto';
import DatabaseErrorCode from '../../infra/database/database.error';
import HttpException from '../../utils/http-exception';
import User from './entities/user.entity';
import { convertQueryResultKeys } from '../../utils/case-conversion';
import { Role } from './users.type';

@Service()
class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { firstName, lastName, email, role } = createUserDto;

    try {
      const result = await this.databaseService.runQuery(
        `
        INSERT INTO users(first_name, last_name, email, role)
        VALUES ($1, $2, $3, $4)
        `,
        [firstName, lastName, email, role],
      );

      if (result.rowCount === 0) {
        throw new HttpException('Cannot create user', 500);
      }
    } catch (error) {
      if ((error as DatabaseError).code === DatabaseErrorCode.UniqueViolation) {
        throw new HttpException('User already exists', 409);
      }

      throw error;
    }
  }

  async getOneByEmail(email: string): Promise<User | null> {
    const result = await this.databaseService.runQuery(
      `
        SELECT id, first_name, last_name, email, role
        FROM users
        WHERE email = $1
        `,
      [email],
    );

    if (result.rowCount === 0) return null;

    return plainToInstance(User, convertQueryResultKeys(result.rows[0]));
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.databaseService.runQuery(
      `
        SELECT id, first_name, last_name, email, role
        FROM users
        `,
      [],
    );

    return result.rows.map((row) => plainToInstance(User, convertQueryResultKeys(row)));
  }

  async getUsersByRole(role?: Role): Promise<User[]> {
    const result = await this.databaseService.runQuery(
      `
        SELECT id, first_name, last_name, email, role
        FROM users
        WHERE role = $1
        `,
      [role],
    );

    return result.rows.map((row) => plainToInstance(User, convertQueryResultKeys(row)));
  }
}

export default UserRepository;
