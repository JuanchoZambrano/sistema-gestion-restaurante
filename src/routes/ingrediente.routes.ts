import { Router } from 'express';
import {
  getIngredientes,
  createIngrediente,
  updateIngrediente,
  deleteIngrediente,
  consultarStockIngredientes,
} from '../controllers/ingrediente.controller';
import { verificarToken, autorizarRoles } from '../middlewares/auth.middleware';

const router: Router = Router();

router.get('/stock', verificarToken, autorizarRoles('GERENTE'), consultarStockIngredientes);
router.get('/', getIngredientes);
router.post('/', createIngrediente);
router.put('/:id', updateIngrediente);
router.delete('/:id', deleteIngrediente);

export default router;