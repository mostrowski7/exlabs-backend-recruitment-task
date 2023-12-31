import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { Role } from '../../modules/users/users.type';
import { roles } from '../../modules/users/entities/user.entity';

class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  email: string;

  @IsIn(roles)
  role: Role;
}

export default CreateUserDto;
