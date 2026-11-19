import { Router } from 'express';
import { getIngredientes } from './ingrediente.controller';
import {createIngrediente} from './ingrediente.controller';

const router: Router = Router();

router.get('/', getIngredientes);
router.post('/', createIngrediente);

export default router;