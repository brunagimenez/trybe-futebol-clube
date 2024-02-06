import { NewEntity } from '../Interfaces/NewEntity';
import MatchesModel from '../models/MatchesModel';
import { IMatches, IMatchesGoals } from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(filter: boolean | null): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    if (filter === null) {
      return { status: 'SUCCESSFUL', data: allMatches };
    }
    const progressMatches = allMatches.filter(({ inProgress }) => (inProgress === filter));
    return { status: 'SUCCESSFUL', data: progressMatches };
  }

  public async updateProgress(
    id: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const updatedMatche = await this.matchesModel.updateProgress(id);
    if (!updatedMatche) return { status: 'NOT_FOUND', data: { message: `Matche ${id} not found` } };
    return { status: 'SUCCESSFUL', data: { message: updatedMatche } };
  }

  public async updateResult(
    id: number,
    matches: IMatchesGoals,
  ): Promise<ServiceResponse<ServiceMessage>> {
    const matcheFound = await this.matchesModel.findById(id);
    if (!matcheFound) return { status: 'NOT_FOUND', data: { message: `Mac ${id} not found` } };

    const updatedMatche = await this.matchesModel.updateResult(id, matches);
    if (!updatedMatche) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Matches ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Matche updated' } };
  }

  public async createMatch(match: NewEntity<IMatches>): Promise<ServiceResponse<IMatches>> {
    const homeTeam = await this.matchesModel.findById(match.homeTeamId);
    const awayTeam = await this.matchesModel.findById(match.awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }
    const matchInProgress = { ...match, inProgress: true };
    const newMatche = await this.matchesModel.create(matchInProgress);
    return { status: 'SUCCESS', data: newMatche };
  }
}
