import { Router } from 'express';
import { 
    obtenerProveedores, 
    crearProveedor, 
    actualizarProveedor, 
    eliminarProveedor 
} from '../controllers/proveedor.controller';
import { validarProveedor } from '../middlewares/proveedor.middleware';

const router = Router();

router.get('/', obtenerProveedores);
router.post('/', validarProveedor, crearProveedor);
router.put('/:id', validarProveedor, actualizarProveedor);
router.delete('/:id', eliminarProveedor);

export default router;