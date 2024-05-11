FROM node:18-alpine

WORKDIR /app

COPY package.json /app 

RUN npm ci

COPY . .

ENV PORT 3005

EXPOSE $PORT

CMD ["npm", "run", "dev"]