FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine as Production
WORKDIR /app
COPY --from=build /app/ .
EXPOSE 3000
CMD ["npm", "start"]