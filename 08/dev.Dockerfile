FROM node:18.12-alpine3.17
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm clean-install --omit=dev
COPY ./ ./
RUN npm run build
EXPOSE 4000/tcp
CMD npm run start:dev
