import { Request, Router, Response } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllLeaderboard(req, res),
);
router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAllLeaderboardAway(req, res),
);
export default router;
