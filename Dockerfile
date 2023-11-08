FROM node:18.16.1-alpine3.17 AS build

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run check
RUN npm run build

FROM node:18.16.1-alpine3.17 AS prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/build .

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "index.js"]
