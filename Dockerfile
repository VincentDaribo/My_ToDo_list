FROM node:latest
WORKDIR app
COPY . /app
EXPOSE 8080
RUN npm install
CMD ["node", "src/index.js"]