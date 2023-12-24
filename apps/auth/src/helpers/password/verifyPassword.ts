import * as bcrypt from 'bcrypt';

async function verifyPassword(
  password: string,
  salt: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const hashedInputPassword = await bcrypt.hash(password, salt);
    return hashedInputPassword === hashedPassword;
  } catch (error) {
    // Handle error
    return false;
  }
}

export default verifyPassword;
