import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; 
  pagination?: {
    limit: number;
    offset: number;
    sort: [string, string][];
  };
}


