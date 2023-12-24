import * as jwt from 'jsonwebtoken';

export default function verifyJwt(token: string, secret: string): boolean {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}
