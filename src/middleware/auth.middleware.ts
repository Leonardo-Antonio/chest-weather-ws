import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const keypub = readFileSync('config/app.rsa.pub', 'utf8');
    const token = req.headers['authorization'];

    verify(token, keypub, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = decoded;
      next();
    });
  }
}
