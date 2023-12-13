import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common.entity';
import UserRole from '../enums/user.role.enum';

@Entity('users')
export class User extends CommonEntity {
  @Column({ name: 'firstName', type: 'varchar', nullable: false })
  firstName: string;

  @Column({ name: 'lastName', type: 'varchar', nullable: false })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'passwordHash', type: 'varchar', nullable: true })
  passwordHash: string;

  @Column({ name: 'passwordSalt', type: 'varchar', nullable: true })
  passwordSalt: string;

  @Column({ name: 'address', type: 'varchar', enum: UserRole, nullable: false })
  role: UserRole;
}
