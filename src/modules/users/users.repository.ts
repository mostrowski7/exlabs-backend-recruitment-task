import { Service } from 'typedi';
import DatabaseService from '../../infra/database/database.service';

@Service()
class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createUser() {
    return await this.databaseService.runQuery('', []);
  }
}

export default UserRepository;
