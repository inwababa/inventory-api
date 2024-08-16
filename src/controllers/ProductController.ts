import { Request, Response } from 'express';
import Product from '../models/Product';
import { validationResult } from 'express-validator';
import { AuthenticatedRequest } from '../interface/customInterface';

export const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { limit, offset, sort } = req.pagination!;

    const products = await Product.findAll({
      limit,
      offset,
      order: sort,
    });
    res.json({success: true, message: 'Products fetched successfully', data: products});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};

export const getProductById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    } 

    res.json({success: true, message: 'Product fetched successfully', data: product});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
};

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price } = req.body;

  try {
    const product = await Product.create({ name, description, price });
    res.status(201).json({success: true, message: 'Product created successfully', data: product});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating product' });
  }
};

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ success: true, message: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    await product.save();

    res.json({success: true, message: 'Product updated successfully', data: product});
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ success: true, message: 'Product not found' });
    }

    await product.destroy();
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
};
