import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interface/customInterface';

export const paginate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let { page, limit, sortBy, order } = req.query;

  // Set default values if not provided
  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(limit as string, 10) || 10;
  const sortField = sortBy ? sortBy.toString() : 'createdAt';
  const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

  // Calculate the offset for Sequelize
  const offset = (pageNumber - 1) * pageSize;

  // Attach pagination info to request object
  req.pagination = {
    limit: pageSize,
    offset,
    sort: [[sortField, sortOrder]],
  };

  next();
};
