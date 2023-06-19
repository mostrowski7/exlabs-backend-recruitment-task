import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { roles } from '../../modules/users/entities/user.entity';
import { Role } from '../../modules/users/users.type';
import { Type } from 'class-transformer';

class UpdateUserBodyDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsIn(roles)
  role?: Role;
}

class UpdateUserParamDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export { UpdateUserBodyDto, UpdateUserParamDto };
