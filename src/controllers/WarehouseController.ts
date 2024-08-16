import { Request, Response } from 'express';
import Warehouse from '../models/Warehouse';
import { validationResult } from 'express-validator';
import { AuthenticatedRequest } from '../interface/customInterface';

export const getWarehouses = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { limit, offset, sort } = req.pagination!;
    const warehouses = await Warehouse.findAll({
        limit,
        offset,
        order: sort,
      });
    res.json({success: true, message: 'warehouses fetched', data: warehouses});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching warehouses' });
  }
};

export const getWarehouseById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
        return res.status(404).json({ success: false, message: 'Warehouse not found' });
    }

    res.json({success: true, message: 'warehouse fetched', data: warehouse});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching warehouse' });
  }
};

export const createWarehouse = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, location, capacity } = req.body;

  try {
    const warehouse = await Warehouse.create({ name, location, capacity });
    res.status(201).json({success: true, message: 'warehouse created', data: warehouse});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating warehouse' });
  }
};

export const updateWarehouse = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, location, capacity } = req.body;

  try {
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
        return res.status(404).json({ success: false, message: 'Warehouse not found' });
    }

    warehouse.name = name;
    warehouse.location = location;
    warehouse.capacity = capacity;
    await warehouse.save();

    res.json({success: true, message: 'warehouse updated', data: warehouse});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating warehouse' });
  }
};

export const deleteWarehouse = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const warehouse = await Warehouse.findByPk(id);
    if (!warehouse) {
        return res.status(404).json({ success: false, message: 'Warehouse not found' });
    }

    await warehouse.destroy();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting warehouse' });
  }
};
