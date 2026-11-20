import { Router } from 'express';
import {
  getPlatoIngredientes,
  createPlatoIngrediente
} from '../controllers/platoIngrediente.controller';

const router: Router = Router();

router.get('/', getPlatoIngredientes);
router.post('/', createPlatoIngrediente);

export default router;