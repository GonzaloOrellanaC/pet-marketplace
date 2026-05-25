import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  tenantId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  items: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  commissionPaid: number;
  status: 'pending' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentDetails: {
    method: string;
    transactionId: string;
    status: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  commissionPaid: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'preparing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  shippingAddress: { type: String, required: true },
  paymentDetails: {
    method: { type: String },
    transactionId: { type: String },
    status: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);
