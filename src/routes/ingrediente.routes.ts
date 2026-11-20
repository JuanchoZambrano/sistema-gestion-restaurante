import { Router } from 'express';
import {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
} from '../controllers/ingrediente.controller';

const router: Router = Router();

router.get('/', getIngredientes);
router.post('/', createIngrediente);
router.put('/:id', updateIngrediente);
router.delete('/:id', deleteIngrediente);

export default router;