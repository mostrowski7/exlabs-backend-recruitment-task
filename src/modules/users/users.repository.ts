import { Service } from 'typedi';
import DatabaseService from '../../infra/database/database.service';
import CreateUserDto from '../../interfaces/dtos/create-user.dto';
import { DatabaseError } from 'pg';
import DatabaseErrorCode from '../../infra/database/database.error';
import HttpException from '../../utils/http-exception';

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
}

export default UserRepository;
