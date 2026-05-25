import express from 'express';
import multer from 'multer';
import { login, register } from '../controllers/authController.ts';
import { getProducts, createProduct, updateProduct, deleteProduct, bulkUpload } from '../controllers/productController.ts';
import { auth, checkRole } from '../middleware/auth.ts';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Auth
router.post('/auth/register', register);
router.post('/auth/login', login);

// Products
router.get('/products', getProducts);
router.post('/products', auth, checkRole(['seller']), createProduct);
router.put('/products/:id', auth, checkRole(['seller']), updateProduct);
router.delete('/products/:id', auth, checkRole(['seller']), deleteProduct);
router.post('/products/bulk', auth, checkRole(['seller']), upload.single('file'), bulkUpload);

// Future: Orders, Tenants, etc.
// router.get('/orders', auth, getOrders);
// router.post('/tenants', auth, checkRole(['superadmin']), createTenant);

export default router;
