FROM node:16.15.0-alpine3.15

RUN mkdir /app
RUN mkdir /app/ws

WORKDIR /app/ws

COPY . .

EXPOSE 7000

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]