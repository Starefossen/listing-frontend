FROM node:12.4.0-alpine as builder

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN mkdir -p $APP_PATH/build && yarn

# Copy necessary source files for server and client build
COPY .babelrc razzle-add-entry-plugin.js razzle.config.js postcss.config.js $APP_PATH/

COPY src $APP_PATH/src
COPY public $APP_PATH/public

# Build client code
RUN yarn run build

# Run stage
FROM node:12.4.0-alpine

ENV HOME=/home/app
ENV APP_PATH=$HOME/listing-frontend

RUN npm install razzle -g

WORKDIR $APP_PATH
COPY --from=builder $APP_PATH/build build
COPY .babelrc razzle-add-entry-plugin.js razzle.config.js postcss.config.js package.json yarn.lock $APP_PATH/

ENV NODE_ENV=production

CMD ["razzle", "start"]
