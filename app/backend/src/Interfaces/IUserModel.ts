import { IUsers } from './IUsers';
import { ILogin } from './ILogin';

export interface IUserModel {
  findOne(email: ILogin['email']): Promise<IUsers | null>,
  findById(id: IUsers['id']): Promise<IUsers | null>
}
