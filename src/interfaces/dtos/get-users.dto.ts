import { IsIn, IsOptional } from 'class-validator';
import { Role } from '../../modules/users/users.type';
import { roles } from '../../modules/users/entities/user.entity';

class GetUsersDto {
  @IsIn(roles)
  @IsOptional()
  role?: Role;
}

export default GetUsersDto;
