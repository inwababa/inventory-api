import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interface/customInterface';

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied, you do not have permission' });
    }
    next();
  };
};