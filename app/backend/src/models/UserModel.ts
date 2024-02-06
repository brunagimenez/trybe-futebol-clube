import { IUserModel } from '../Interfaces/IUserModel';
import { IUsers } from '../Interfaces/IUsers';
import { ILogin } from '../Interfaces/ILogin';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class LoginModel implements IUserModel {
  private model = SequelizeUsers;
  async findOne(email: ILogin['email']): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return !dbData ? null : dbData;
  }

  async findById(id: IUsers['id']): Promise<IUsers | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    return dbData;
  }
}
