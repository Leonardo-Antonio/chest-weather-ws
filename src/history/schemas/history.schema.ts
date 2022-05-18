import { Schema } from 'mongoose';

export const HistorySchema = new Schema({
  id_user: { type: Schema.Types.ObjectId, required: true },
  keywordPlaceSearch: { type: String, required: false },
  keywordCodeCountry: { type: String, required: false },
  temp: { type: String, required: true },
  tempMax: { type: String, required: true },
  tempMin: { type: String, required: true },
  humidity: { type: String, required: true },
  country: { type: String, required: true },
  place: { type: String, required: true },
  coord: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
});

/*
KeyWordsPlaceSearch
KeyWordsCodeCountry
Temp: 19.15 °C
TempMax: 19.15 °C
TempMin: 18.2 °C
Humidity: 66%
Country: PE
Place: Urbanización Vista Alegre
coord (Log - Lat): -76.9556/-12.1766
*/
