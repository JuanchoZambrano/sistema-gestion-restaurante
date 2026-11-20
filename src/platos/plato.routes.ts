import { Router } from 'express';
import { getPlatos } from './plato.controller';
import { createPlato } from './plato.controller';
import { updatePlato } from './plato.controller';
import { deletePlato } from './plato.controller';

const router: Router = Router();

router.get('/', getPlatos);
router.post('/', createPlato);
router.put('/:id', updatePlato);
router.delete('/:id', deletePlato);

export default router;
