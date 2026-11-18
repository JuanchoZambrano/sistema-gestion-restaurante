import { Router } from 'express';
import { getPlatos } from './plato.controller';

const router: Router = Router();

router.get('/', getPlatos);

export default router;
