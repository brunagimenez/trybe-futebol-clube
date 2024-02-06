import awayLeaderboard from '../utils/rulesLeaderboardAway/awayLeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesService from './MatchesService';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../Interfaces/ITeamModel';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import arrayLeaderboard from '../utils/rulesLeaderboard/arrayLeaderboard';
import calculateOrder from '../utils/rulesLeaderboardAway/calculateOrder';

export default class LeaderboardService {
  constructor(
    private matchesService = new MatchesService(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const { data } = await this.matchesService.getAllMatches(false);
    if (Array.isArray(data)) {
      const allTeams = await this.teamModel.findAll();
      const allLeaderboard = arrayLeaderboard(data, allTeams);
      const order = allLeaderboard.sort(calculateOrder);
      return { status: 'SUCCESSFUL', data: order };
    }
    return { status: 'NOT_FOUND', data: { message: 'erro, is not array' } };
  }

  public async getAllLeaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const { data } = await this.matchesService.getAllMatches(false);
    if (Array.isArray(data)) {
      const allTeams = await this.teamModel.findAll();
      const allLeaderboard = awayLeaderboard(data, allTeams);
      const order = allLeaderboard.sort(calculateOrder);
      return { status: 'SUCCESSFUL', data: order };
    }
    return { status: 'NOT_FOUND', data: { message: 'erro, is not array' } };
  }
}
