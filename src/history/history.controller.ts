import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDto } from './dto/history.dto';

@Controller('history')
export class HistoryController {
  constructor(private service: HistoryService) {}
  @Post('save')
  async save(@Body() body: HistoryDto, @Req() req: any) {
    body.id_user = req.user._doc._id;
    const response = await this.service.save(body);
    return response;
  }

  @Get()
  async getById(@Req() req: any) {
    return await this.service.getById(req.user._doc._id);
  }
}
