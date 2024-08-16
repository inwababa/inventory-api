import { Router } from 'express';
import { getStocks, getStockById, createStock, updateStock, deleteStock } from '../controllers/StockController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../utils/roleCheck';
import { validate, stockValidationRules, idValidationRule } from '../utils/validation';
import { paginate } from '../middleware/pagination';

const router = Router();

router.get('/stocks', authenticateJWT, authorizeRoles('admin', 'manager', 'user'), paginate, getStocks);
router.get('/stocks/:id', authenticateJWT, validate(idValidationRule()), getStockById);

router.post('/stocks', authenticateJWT, authorizeRoles('admin', 'manager'), validate(stockValidationRules()), createStock);
router.put('/stocks/:id', authenticateJWT, authorizeRoles('admin', 'manager'), validate([...idValidationRule(), ...stockValidationRules()]), updateStock);
router.delete('/stocks/:id', authenticateJWT, authorizeRoles('admin'), validate(idValidationRule()), deleteStock);

export default router;
