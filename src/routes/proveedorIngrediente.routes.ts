import { Router } from 'express';
import { 
    obtenerProveedorIngredientes, 
    crearProveedorIngrediente, 
    eliminarProveedorIngrediente 
} from '../controllers/proveedorIngrediente.controller';
import { validarProveedorIngrediente } from '../middlewares/proveedorIngrediente.middleware';

const router = Router();

router.get('/', obtenerProveedorIngredientes);
router.post('/', validarProveedorIngrediente, crearProveedorIngrediente);
router.delete('/:id', eliminarProveedorIngrediente);

export default router;