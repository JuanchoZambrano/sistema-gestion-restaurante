import { Router } from 'express';
import { getPlatos } from './plato.controller';
import {createPlato} from './plato.controller';

const router: Router = Router();

router.get('/', getPlatos);
router.post('/', createPlato);

export default router;
