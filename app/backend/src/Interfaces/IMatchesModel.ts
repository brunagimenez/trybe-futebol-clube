import { IMatches, IMatchesGoals } from './IMatches';
import { NewEntity } from './NewEntity';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  findById(id: IMatches['id']): Promise<IMatches | null>,
  updateProgress(id: IMatches['id']): Promise<string | null>,
  updateResult(
    id: IMatches['id'],
    data: Partial<NewEntity<IMatchesGoals>>,
  ): Promise<IMatches | null>,
  create(data: NewEntity<IMatches>): Promise<IMatches>,
}
