import { Service } from 'typedi';
import UserRepository from './users.repository';
import CreateUserDto from '../../interfaces/dtos/create-user.dto';

@Service()
class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }
}

export default UserService;
