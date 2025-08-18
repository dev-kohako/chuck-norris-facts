FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install

COPY . .

RUN npx tsc

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/index.js"]
