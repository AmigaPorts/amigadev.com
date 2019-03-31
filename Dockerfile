FROM node:10-alpine

# Build arguments

# Required build arguments

# Environment variables
ENV HOST 0.0.0.0
ENV PORT 80

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY .npmrc .
RUN yarn

# Copy source to container and build
COPY . .
RUN yarn build-staging

# Start app
CMD yarn staging

EXPOSE 80