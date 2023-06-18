import { IsEmail } from 'class-validator';

class AuthenticateUserDto {
  @IsEmail()
  email: string;
}

export default AuthenticateUserDto;
