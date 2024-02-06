import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import MatchesController from '../controller/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  Validations.validateJwt,
  (req: Request, res: Response) =>
    matchesController.updateProgress(req, res),
);
router.patch(
  '/:id',
  Validations.validateJwt,
  (req: Request, res: Response) =>
    matchesController.updateResult(req, res),
);
router.post(
  '/',
  Validations.validateJwt,
  Validations.validateMatch,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default router;
