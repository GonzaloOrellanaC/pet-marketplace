import { Request, Response } from 'express';
import Product from '../models/Product.ts';
import csv from 'csv-parser';
import fs from 'fs';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { tenantId, category, search } = req.query;
    let query: any = { status: 'active' };
    if (tenantId) query.tenantId = tenantId;
    if (category) query.category = category;
    if (search) query.$text = { $search: String(search) };

    const products = await Product.find(query).populate('tenantId', 'name slug');
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product({
      ...req.body,
      tenantId: (req as any).user.tenantId
    });
    await product.save();
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantId = (req as any).user.tenantId;
    const product = await Product.findOneAndUpdate(
      { _id: id, tenantId },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tenantId = (req as any).user.tenantId;
    const product = await Product.findOneAndDelete({ _id: id, tenantId });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const bulkUpload = async (req: Request, res: Response) => {
  try {
    if (!(req as any).file) return res.status(400).json({ message: 'No file uploaded' });
    
    const results: any[] = [];
    const tenantId = (req as any).user.tenantId;

    fs.createReadStream((req as any).file.path)
      .pipe(csv())
      .on('data', (data) => results.push({ ...data, tenantId }))
      .on('end', async () => {
        await Product.insertMany(results);
        fs.unlinkSync((req as any).file.path);
        res.json({ message: `Successfully imported ${results.length} products` });
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
