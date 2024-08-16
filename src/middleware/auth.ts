import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interface/customInterface';



export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        if (!token) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    
        const user =  jwt.verify(token, process.env.JWT_SECRET!);
    
        req.user = user;
    
        next();
      } catch (error) {
        // Handle any errors
        return res.status(403).json({ success: false, message: 'Token expired or invalid' });
      }
};