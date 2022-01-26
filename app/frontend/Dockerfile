FROM node:16.13-alpine

WORKDIR /usr/app
COPY ./ /usr/app
COPY ./.env.example /usr/app/.env

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]