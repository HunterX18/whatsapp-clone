# Use an official Node.js runtime as a base image
FROM node:18-alpine

RUN apk update && apk add bash && apk add --no-cache coreutils

# Set the working directory inside the container
WORKDIR /usr/src/app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the wait-for-it.sh script into the container
COPY wait-for-it.sh /usr/src/app/server/wait-for-it.sh

# Make the script executable
RUN chmod +x /usr/src/app/server/wait-for-it.sh

CMD ["/usr/src/app/server/wait-for-it.sh", "db:3306", "--", "sh", "-c", "npx prisma db push && npx prisma generate && npm start"]
