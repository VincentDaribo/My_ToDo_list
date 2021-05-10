FROM node:latest
WORKDIR app
COPY . /app
EXPOSE 80
RUN npm install
CMD ["node", "src/index.js"]