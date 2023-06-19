import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

class GetUserDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export default GetUserDto;
