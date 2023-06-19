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
    return this.userRepository.create(createUserDto);
  }

  async getUsersByRole(role?: Role): Promise<User[]> {
    if (role) {
      return this.userRepository.getManyByRole(role);
    }

    return this.userRepository.getMany();
  }

  async findUser(id: number): Promise<User> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: number, updateUserDto: UpdateUserBodyDto): Promise<void> {
    return this.userRepository.updateById(id, updateUserDto);
  }

  async deleteUser(id: number): Promise<void> {
    return this.userRepository.deleteById(id);
  }
}

export default UserService;
