import * as jwt from 'jsonwebtoken';
import { User } from '../../users/entities/user.entity';

export default function generateJwt(
  data: Pick<User, 'id' | 'role'>,
  secret: string,
): { accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign(data, secret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(data, secret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
}
