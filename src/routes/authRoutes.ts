import { Router } from 'express';
import { register, login } from '../controllers/AuthController';
import { validate, userValidationRules, loginValidationRules } from '../utils/validation';

const router = Router();

router.post('/register', validate(userValidationRules()), register);
router.post('/login', validate(loginValidationRules()), login);

export default router;
