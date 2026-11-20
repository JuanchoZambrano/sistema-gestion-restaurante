import { Router } from 'express';
import { getPlatos } from '../controllers/plato.controller';
import { createPlato } from '../controllers/plato.controller';
import { updatePlato } from '../controllers/plato.controller';
import { deletePlato } from '../controllers/plato.controller';

const router: Router = Router();

router.get('/', getPlatos);
router.post('/', createPlato);
router.put('/:id', updatePlato);
router.delete('/:id', deletePlato);

export default router;
