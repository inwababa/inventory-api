import { Request, Response, NextFunction } from 'express';
import { paginate } from '../../middleware/pagination';
import { AuthenticatedRequest } from '../../interface/customInterface';

describe('Pagination Middleware', () => {
  let req: Partial<AuthenticatedRequest>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      query: {}
    };
    res = {};
    next = jest.fn();
  });

  it('should set default pagination values when no query params are provided', () => {
    paginate(req as AuthenticatedRequest, res as Response, next);

    expect(req.pagination).toEqual({
      limit: 10,
      offset: 0,
      sort: [['createdAt', 'ASC']],
    });
    expect(next).toHaveBeenCalled();
  });

  it('should set pagination values based on query params', () => {
    req.query = {
      page: '2',
      limit: '5',
      sortBy: 'name',
      order: 'desc'
    };

    paginate(req as AuthenticatedRequest, res as Response, next);

    expect(req.pagination).toEqual({
      limit: 5,
      offset: 5,
      sort: [['name', 'DESC']],
    });
    expect(next).toHaveBeenCalled();
  });
});
