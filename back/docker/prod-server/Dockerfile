FROM node:alpine3.10

RUN mkdir -p /usr/src/back

WORKDIR /usr/src/back

COPY package.json /usr/src/back

COPY package-lock.json /usr/src/back

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm ci --production \
    && apk del build-dependencies

COPY . /usr/src/back

CMD ["npm","run","start"]
# CMD ["npm","run","production"]