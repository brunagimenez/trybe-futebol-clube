import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import { ILogin } from '../Interfaces/ILogin';
import JwtUtils from '../utils/jwt.util';
import UserModel from '../models/UserModel';

export default class AuthController {
  private jwtUtils = new JwtUtils();

  private model: UserModel = new UserModel();

  async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;
    const user = await this.model.findOne(email);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = this.jwtUtils.sign({ id: user.id });

    return res.status(200).json({
      token,
    });
  }

  async role(req: Request, res: Response) {
    const { authorization } = req.headers;
    const message = 'Token must be a valid token';
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const data = authorization.split(' ');
    try {
      const { id } = this.jwtUtils.verify(data[1]) as JwtPayload;
      const serviceResponse = await this.model.findById(id);
      if (serviceResponse === null) {
        return res.status(401).json({ message });
      }
      const { role } = serviceResponse;
      return res.status(200).json({ role });
    } catch (error) {
      return res.status(401).json({ message });
    }
  }
}
