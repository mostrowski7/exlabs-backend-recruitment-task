import { Service } from 'typedi';
import UserRepository from '../users/users.repository';
import AuthenticateUserDto from '../../interfaces/dtos/authenticate-user.dto';
import jwt from 'jsonwebtoken';
import config from '../../config';
import HttpException from '../../utils/http-exception';

@Service()
class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticateUser({ email }: AuthenticateUserDto): Promise<string> {
    const user = await this.userRepository.getOneByEmail(email);

    if (!user) throw new HttpException('Unauthenticated', 401);

    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: config.jwtExpirationTime,
    });
  }
}

export default AuthService;
