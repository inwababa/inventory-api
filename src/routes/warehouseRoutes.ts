import { Router } from 'express';
import { getWarehouses, getWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse } from '../controllers/WarehouseController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../utils/roleCheck';
import { validate, warehouseValidationRules, idValidationRule } from '../utils/validation';
import { paginate } from '../middleware/pagination';

const router = Router();

router.get('/warehouses', authenticateJWT, authorizeRoles('admin', 'manager', 'user'), paginate, getWarehouses);
router.get('/warehouses/:id', authenticateJWT, validate(idValidationRule()), getWarehouseById);

router.post('/warehouses', authenticateJWT, authorizeRoles('admin', 'manager'), validate(warehouseValidationRules()), createWarehouse);
router.put('/warehouses/:id', authenticateJWT, authorizeRoles('admin', 'manager'), validate([...idValidationRule(), ...warehouseValidationRules()]), updateWarehouse);
router.delete('/warehouses/:id', authenticateJWT, authorizeRoles('admin'), validate(idValidationRule()), deleteWarehouse);

export default router;
