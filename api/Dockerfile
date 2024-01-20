FROM node

WORKDIR /opt/backend

RUN npm install json-server

COPY db.json /opt/backend

EXPOSE 3000

CMD [ "npx", "json-server", "--watch", "db.json" ]