FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
#ENV REACT_APP_PT_API_SERVICE_SERVICE_HOST=192.168.1.5:31762
#ENV REACT_APP_PT_API_SERVICE_UI_HOST=192.168.1.5:31305
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.19-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]