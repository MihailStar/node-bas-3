FROM node:18.12-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install-clean --omit=dev
COPY ./ ./
RUN npm run build
EXPOSE 4000/tcp
CMD npm run start:dev
