import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { MongooseError } from 'mongoose';
import { base64encode } from 'nodejs-base64';
import { LogInDto } from './dto/log-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post('sign-up')
  @HttpCode(200)
  async signUp(@Body() body: SignUpDto, @Res() res) {
    body.password = base64encode(body.password).toLocaleString();
    try {
      const response = await this.service.signUp(body);
      return res.status(200).json(response);
    } catch (error) {
      if (error.code == 11000) {
        return res.status(400).json({
          status: 'error',
          error: error.message,
        });
      }
    }
  }

  @Post('log-in')
  @HttpCode(200)
  async logIn(@Body() body: LogInDto, @Res() res) {
    try {
      const response = await this.service.logIn(body);

      if (!response.isValid) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid credentials',
        });
      }

      return res
        .status(200)
        .json({ token: this.service.signJWT(response.user), data: response });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
