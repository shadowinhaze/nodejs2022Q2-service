FROM node:lts-alpine AS builder
WORKDIR /app
COPY ./*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE ${API_PORT}
CMD ["npm", "run", "start:dev"]