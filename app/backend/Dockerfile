FROM node:16.13-alpine

# dependencies
RUN apk add --no-cache --virtual deps \
  python3 \
  build-base

WORKDIR /usr/app
COPY ./ /usr/app
COPY ./.env.example /usr/app/.env

RUN npm install --legacy-peer-deps && npm run build

EXPOSE 4000

CMD ["npm", "run", "dev"]