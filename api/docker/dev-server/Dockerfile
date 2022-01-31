FROM node:alpine3.10 as base

RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

COPY package.json /usr/src/api
COPY package-lock.json /usr/src/api

# FROM base as test
# RUN npm ci
# COPY . /usr/src/api
# CMD [ "npm", "run", "test"]

FROM base as prod
RUN npm ci --production
COPY . /usr/src/api
CMD [ "npm", "run", "start" ]