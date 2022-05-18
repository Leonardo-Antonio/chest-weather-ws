import fs from 'fs';

export const privateKey = fs.readFileSync('config/app.rsa', 'utf8');
