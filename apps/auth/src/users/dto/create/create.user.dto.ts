import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class CreateUserBodyDto extends PickType(UserDto, [
  'email',
  'firstName',
  'lastName',
] as const) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'User password.' })
  password: string;
}
