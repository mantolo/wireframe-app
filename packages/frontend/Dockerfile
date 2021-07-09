FROM node:14-alpine
WORKDIR /app
COPY ./package* ./
RUN npm install --production
COPY ./public ./public
COPY ./src ./src
CMD ["npm", "run", "build"]