import { Request, Router, Response } from 'express';
import AuthController from '../controller/AuthController';
import Validations from '../middlewares/Validations';

const autController = new AuthController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => autController.login(req, res),
);

router.get(
  '/:role',
  (req: Request, res: Response) => autController.role(req, res),
);

export default router;
