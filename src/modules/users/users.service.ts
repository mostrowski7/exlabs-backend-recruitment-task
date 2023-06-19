import { Service } from 'typedi';
import UserRepository from './users.repository';
import CreateUserDto from '../../interfaces/dtos/create-user.dto';
import { Role } from './users.type';
import User from './entities/user.entity';

@Service()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async getUsers(role?: Role): Promise<User[]> {
    if (role) {
      return this.userRepository.getUsersByRole(role);
    }

    return this.userRepository.getAllUsers();
  }
}

export default UserService;
