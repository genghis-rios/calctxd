FROM node:22-bookworm-slim AS build

WORKDIR /app

ENV NODE_ENV=development
ENV NPM_CONFIG_PRODUCTION=false

COPY package*.json ./

RUN npm install --include=optional

COPY . .

RUN npm run build

FROM nginx:stable-bookworm

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/ /usr/share/nginx/html/

RUN mkdir -p /usr/share/nginx/html/calc

COPY --from=build /app/dist/ /usr/share/nginx/html/calc/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
