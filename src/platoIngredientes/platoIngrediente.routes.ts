import { Router } from 'express';
import { getPlatoIngredientes } from './platoIngrediente.controller';

const router: Router = Router();

router.get('/', getPlatoIngredientes);

export default router;