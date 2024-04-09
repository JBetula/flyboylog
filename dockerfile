FROM node:alpine3.18
# FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./controllers ./controllers
COPY ./models ./models
COPY ./routes ./routes
COPY ./static ./static
COPY ./downloads ./downloads
COPY airports_pos.js .
COPY airports.csv .
COPY convert_csv_to_entry.js .
COPY db.js .
COPY debug.js .
COPY server.js .
COPY start.sh .

EXPOSE 3000

CMD ["/bin/sh", "start.sh"]
