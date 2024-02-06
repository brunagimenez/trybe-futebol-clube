import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = process.env.JWT_SECRET || 10;

const hashPassword = (password: string): string => bcrypt.hashSync(password, SALT_ROUNDS);

const passwordIsEqual = (password: string, hashedPassword: string):boolean =>
  bcrypt.compareSync(password, hashedPassword);

export default {
  hashPassword,
  passwordIsEqual,
};
