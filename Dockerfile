FROM alpine:3.10
WORKDIR /app
COPY . /app
EXPOSE 80                                                                 
RUN npm install                                                           
CMD ["node", "server.js"]