# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

RUN npx prisma generate
RUN npx prisma db push

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
