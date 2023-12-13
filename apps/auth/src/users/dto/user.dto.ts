import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';
import UserRole from '../enums/user.role.enum';

export class UserDto implements User {
  @ApiProperty({ description: 'The unique identifier of the user.' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'The first name of the user.' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user.' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The email address of the user.' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The password of the user.' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'The role of the user.' })
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ description: 'The hashed password of the user.' })
  @IsNotEmpty()
  @IsString()
  passwordHash: string;

  @ApiProperty({ description: 'The salt used for password hashing.' })
  @IsNotEmpty()
  @IsString()
  passwordSalt: string;

  @ApiProperty({ description: 'The date and time when the user was created.' })
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the user was last updated.',
  })
  @IsNotEmpty()
  @IsDateString()
  updatedAt: Date;
}
