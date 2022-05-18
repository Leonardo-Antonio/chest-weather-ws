import { Document } from 'mongoose';

export interface HistoryInterface extends Document {
  id_user: string;
  keywordPlaceSearch: string;
  keywordCodeCountry: string;
  temp: string;
  tempMax: string;
  tempMin: string;
  humidity: string;
  country: string;
  place: string;
  coord: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isActive: boolean;
}
