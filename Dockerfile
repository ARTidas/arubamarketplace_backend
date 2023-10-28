# Build Stage
FROM node:14 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Final Stage
FROM node:14
WORKDIR /usr/src/app
COPY --from=build /usr/src/app ./build
EXPOSE 80
CMD ["node", "build/app.js"]