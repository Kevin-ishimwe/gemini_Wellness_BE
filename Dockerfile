FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE $PORT

CMD ["npm", "start"]