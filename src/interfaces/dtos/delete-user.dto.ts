import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class DeleteUserDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export default DeleteUserDto;
