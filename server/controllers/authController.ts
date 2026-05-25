import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, tenantId } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ email, password, name, role, tenantId });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role, tenantId: user.tenantId }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, email, name, role, tenantId } });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Handle 2FA if enabled (placeholder)
    if (user.is2FAEnabled) {
      return res.status(200).json({ requires2FA: true, userId: user._id });
    }

    const token = jwt.sign({ id: user._id, role: user.role, tenantId: user.tenantId }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, email, name: user.name, role: user.role, tenantId: user.tenantId } });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
