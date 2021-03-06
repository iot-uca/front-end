# build stage - generates the bundle
FROM node:9.11.1-alpine as build-stage
WORKDIR /cosmos-gui
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage - serves the bundle through Nginx
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /cosmos-gui/dist /usr/share/nginx/html
COPY prod_nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
