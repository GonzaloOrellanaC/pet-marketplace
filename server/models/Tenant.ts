import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  plan: 'basic' | 'pro' | 'enterprise';
  commissionRate: number;
  status: 'active' | 'suspended' | 'blocked';
  subscriptionExpiresAt: Date;
  settings: {
    shippingEnabled: boolean;
    zones: {
      name: string;
      cost: number;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  description: { type: String },
  plan: { type: String, enum: ['basic', 'pro', 'enterprise'], default: 'basic' },
  commissionRate: { type: Number, default: 0.1 }, // 10%
  status: { type: String, enum: ['active', 'suspended', 'blocked'], default: 'active' },
  subscriptionExpiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
  settings: {
    shippingEnabled: { type: Boolean, default: true },
    zones: [{
      name: { type: String },
      cost: { type: Number }
    }]
  }
}, { timestamps: true });

export default mongoose.model<ITenant>('Tenant', TenantSchema);
