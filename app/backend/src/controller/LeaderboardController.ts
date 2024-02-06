import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getAllLeaderboard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAllLeaderboard();
    res.status(200).json(serviceResponse.data);
  }

  public async getAllLeaderboardAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAllLeaderboardAway();
    res.status(200).json(serviceResponse.data);
  }
}
