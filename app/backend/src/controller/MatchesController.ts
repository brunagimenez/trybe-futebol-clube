import { Request, Response } from 'express';
import MatchesService from '../service/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    let filter = null;
    if (inProgress === 'false') {
      filter = false;
    }
    if (inProgress === 'true') {
      filter = true;
    }
    const serviceResponse = await this.matchesService.getAllMatches(filter);
    res.status(200).json(serviceResponse.data);
  }

  public async updateProgress(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchesService.updateProgress(id);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async updateResult(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const matches = req.body;
    const serviceResponse = await this.matchesService.updateResult(id, matches);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.createMatch(req.body);
    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
