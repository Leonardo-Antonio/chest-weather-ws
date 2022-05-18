import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
import { SignUpDto } from './dto/sign-up.dto';
import { base64decode } from 'nodejs-base64';
import { LogInDto } from './dto/log-in.dto';
import { createReadStream } from 'fs';
import { sign } from 'jsonwebtoken';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private userModel: Model<UserInterface>) {}

  async signUp(data: SignUpDto) {
    const user = new this.userModel(data);
    return await user.save();
  }

  async logIn(data: LogInDto) {
    const user = await this.userModel.findOne({ email: data.email });
    const pass = base64decode(user.password);

    if (data.password != pass) {
      return {
        isValid: false,
        user: null,
      };
    }

    return {
      isValid: true,
      user,
    };
  }

  signJWT(data: UserInterface) {
    delete data.password;

    const key = readFileSync('config/app.rsa', 'utf8');
    return sign({ ...data }, key, { algorithm: 'RS256' });
  }
}
