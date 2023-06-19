import { Service } from 'typedi';
import UserRepository from './users.repository';
import CreateUserDto from '../../interfaces/dtos/create-user.dto';
import { Role } from './users.type';
import User from './entities/user.entity';
import { UpdateUserBodyDto } from '../../interfaces/dtos/update-user.dto';

@Service()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async getUsersByRole(role?: Role): Promise<User[]> {
    if (role) {
      return this.userRepository.getUsersByRole(role);
    }

    return this.userRepository.getAllUsers();
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findUserById(id);
  }

  async updateUserById(id: number, updateUserDto: UpdateUserBodyDto): Promise<void> {
    return this.userRepository.updateUserById(id, updateUserDto);
  }
}

export default UserService;
