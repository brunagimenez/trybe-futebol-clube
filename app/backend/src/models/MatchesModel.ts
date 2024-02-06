import { IMatches, IMatchesGoals } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { NewEntity } from '../Interfaces/NewEntity';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return dbData.map((matches) => (matches));
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    return dbData;
  }

  async updateProgress(id: IMatches['id']): Promise<string | null> {
    const dbData = await this.findById(id);
    if (!dbData) return null;
    const { inProgress } = dbData;
    const [affectedRows] = await this.model.update({ inProgress: !inProgress }, { where: { id } });
    if (affectedRows === 0) return null;

    return 'Finalizado';
  }

  async updateResult(
    id: IMatches['id'],
    data: Partial<NewEntity<IMatchesGoals>>,
  ): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }

  async create(data: NewEntity<IMatches>): Promise<IMatches> {
    const dbData = await this.model.create(data);

    return dbData;
  }
}
