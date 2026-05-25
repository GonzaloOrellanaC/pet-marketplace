import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password?: string;
  name: string;
  role: 'superadmin' | 'seller' | 'customer';
  tenantId?: mongoose.Types.ObjectId; // Only for sellers
  is2FAEnabled: boolean;
  secret2FA?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'seller', 'customer'], default: 'customer' },
  tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
  is2FAEnabled: { type: Boolean, default: false },
  secret2FA: { type: String }
}, { timestamps: true });

UserSchema.pre('save', async function(this: any, next: any) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function(password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
