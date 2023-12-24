import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';

async function generateHash(
  password: string,
): Promise<Pick<User, 'passwordHash' | 'passwordSalt'>> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return { passwordHash: hash, passwordSalt: salt };
}

export default generateHash;
