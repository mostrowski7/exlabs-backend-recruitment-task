import { Service } from 'typedi';
import UserRepository from './users.repository';

@Service()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser() {
    return await this.userRepository.createUser();
  }
}

export default UserService;
