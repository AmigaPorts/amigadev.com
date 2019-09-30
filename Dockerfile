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
RUN npm install

# Copy source to container and build
COPY . .
RUN npm run build-staging

# Start app
CMD npm run staging

EXPOSE 80
