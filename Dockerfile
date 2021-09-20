FROM node:12-alpine

# Build arguments

# Required build arguments
ARG BUILDENV

# Environment variables
ENV HOST 0.0.0.0
ENV PORT 80
ENV BUILDENV ${BUILDENV}

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install

# Copy source to container and build
COPY . .

RUN echo "Building environment: ${BUILDENV}"
RUN npm run build-${BUILDENV}

# Start app
CMD npm run $BUILDENV

EXPOSE 80
