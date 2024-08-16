import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/ProductController';
import { authenticateJWT } from '../middleware/auth';
import { authorizeRoles } from '../utils/roleCheck';
import { validate, productValidationRules, idValidationRule } from '../utils/validation';
import { paginate } from '../middleware/pagination';

const router = Router();

router.get('/products', authenticateJWT, authorizeRoles('admin', 'manager', 'user'), paginate, getProducts);
router.get('/products/:id', authenticateJWT, validate(idValidationRule()), getProductById);

router.post('/products', authenticateJWT, authorizeRoles('admin', 'manager'), validate(productValidationRules()), createProduct);
router.put('/products/:id', authenticateJWT, authorizeRoles('admin', 'manager'), validate([...idValidationRule(), ...productValidationRules()]), updateProduct);
router.delete('/products/:id', authenticateJWT, authorizeRoles('admin'), validate(idValidationRule()), deleteProduct);

export default router;
