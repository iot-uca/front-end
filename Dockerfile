# build stage - generates the bundle
FROM node:9.11.1-alpine as build-stage
WORKDIR /telescope
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage - serves the bundle through Nginx
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /telescope/dist /usr/share/nginx/html
EXPOSE 80
ENV COSMOS_LOCATION=http://localhost:8090
CMD ["nginx", "-g", "daemon off;"]
