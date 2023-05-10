FROM node:18.12-alpine3.17
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm clean-install --omit=dev && npm cache clean --force
COPY ./ ./
RUN npm run build
EXPOSE 4000/tcp
CMD npm run start:prod
