import { Router } from 'express';
import { getPlatoIngredientes } from './platoIngrediente.controller';
import { createPlatoIngrediente } from './platoIngrediente.controller';

const router: Router = Router();

router.get('/', getPlatoIngredientes);
router.post('/', createPlatoIngrediente);

export default router;