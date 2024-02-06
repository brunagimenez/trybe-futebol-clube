import * as jwt from 'jsonwebtoken';
import { Identifiable } from '../Interfaces/Identifiable';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'secret';

  sign(payload: Identifiable): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  verify(token: string) {
    return jwt.verify(token, this.jwtSecret);
  }
}
