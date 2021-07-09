FROM node:14-alpine as server
WORKDIR /app
COPY package* ./
RUN npm install --production
COPY . .
CMD ["npm", "run", "start"]