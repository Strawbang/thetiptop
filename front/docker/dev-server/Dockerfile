FROM node:alpine3.10

RUN mkdir -p /usr/src/front

WORKDIR /usr/src/front

COPY package.json /usr/src/front

COPY package-lock.json /usr/src/front

RUN npm ci --include=dev

COPY . .

CMD ["npm","run","prod"]