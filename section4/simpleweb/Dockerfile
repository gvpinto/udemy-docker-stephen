# Specify a base image
FROM node:14-alpine

# Change the working dir
WORKDIR /usr/app

# Copy just the package.json file to reduce rebuilds
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY ./ ./

# Default command
CMD [ "npm", "start" ]