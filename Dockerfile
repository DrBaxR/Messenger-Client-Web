# Stage 1: install dependencies and build for production
FROM node:10-alpine as build-step

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build --prod

# Stage 2: run the nginx server
FROM nginx:1.17.1-alpine

COPY --from=build-step /usr/src/app/dist/messenger /var/www
COPY nginx/nginx.conf /etc/nginx/nginx.conf