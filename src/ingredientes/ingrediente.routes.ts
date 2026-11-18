import { Router } from 'express';
import { getIngredientes } from './ingrediente.controller';

const router: Router = Router();

router.get('/', getIngredientes);

export default router;