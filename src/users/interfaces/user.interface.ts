import { Document } from 'mongoose';

export interface UserInterface extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isActive: boolean;
}
