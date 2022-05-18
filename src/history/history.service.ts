import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryInterface } from './interfaces/history.interface';
import { HistoryDto } from './dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel('history') private historyModel: Model<HistoryInterface>,
  ) {}

  async save(data: HistoryDto) {
    const history = new this.historyModel(data);
    return await history.save();
  }

  getById(id: string) {
    return this.historyModel.find({ id_user: id });
  }
}
