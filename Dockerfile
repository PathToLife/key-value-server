FROM node:lts-alpine AS builder

WORKDIR /build

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

RUN ls -a

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /build/dist ./

ENV PORT 3000
ENV NODE_ENV production

CMD ["node", "main.js"]
