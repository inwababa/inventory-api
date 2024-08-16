import { Request, Response } from 'express';
import Stock from '../models/Stock';
import { validationResult } from 'express-validator';
import { AuthenticatedRequest } from '../interface/customInterface';

export const getStocks = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { limit, offset, sort } = req.pagination!;
    const stocks = await Stock.findAll({
        limit,
        offset,
        order: sort,
      });
    res.json({success: true, message: 'stocks fetched', data: stocks});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching stocks' });
  }
};

export const getStockById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findByPk(id);
    if (!stock) return res.status(404).json({ success: false, message: 'Stock not found' });

    res.json({success: true, message: 'stock fetched', data: stock});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching stock' });
  }
};

export const createStock = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId, warehouseId, quantity } = req.body;

  try {
    const stock = await Stock.create({ productId, warehouseId, quantity });
    res.status(201).json({success: true, message: 'stock created', data: stock});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating stock' });
  }
};

export const updateStock = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { productId, warehouseId, quantity } = req.body;

  try {
    const stock = await Stock.findByPk(id);
    if (!stock) {
        return res.status(404).json({ success: false, message: 'Stock not found' });
    }

    stock.productId = productId;
    stock.warehouseId = warehouseId;
    stock.quantity = quantity;
    await stock.save();

    res.json({success: true, message: 'stock updated', data: stock});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating stock' });
  }
};

export const deleteStock = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findByPk(id);
    if (!stock) {
        return res.status(404).json({ success: false, message: 'Stock not found' });
    }

    await stock.destroy();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting stock' });
  }
};
