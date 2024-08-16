import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';

export const validate = (validations: any[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// Validation rules

export const userValidationRules = () => [
  body('username').isString().withMessage('Username must be a string'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('role').isString().withMessage('Role must be a string'),
];

export const loginValidationRules = () => [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').exists().withMessage('Password is required'),
];

export const productValidationRules = () => [
  body('name').isString().withMessage('Name must be a string'),
  body('description').isString().withMessage('Description must be a string'),
  body('price').isFloat().withMessage('Price must be a valid number'),
];

export const warehouseValidationRules = () => [
  body('name').isString().withMessage('Name must be a string'),
  body('location').isString().withMessage('Location must be a string'),
  body('capacity').isInt().withMessage('Capacity must be an integer'),
];

export const stockValidationRules = () => [
  body('productId').isInt().withMessage('Product ID must be an integer'),
  body('warehouseId').isInt().withMessage('Warehouse ID must be an integer'),
  body('quantity').isInt().withMessage('Quantity must be an integer'),
];

export const idValidationRule = () => [
  param('id').isInt().withMessage('ID must be an integer'),
];
