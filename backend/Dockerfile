# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files from the backend folder
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the backend application code to the container
COPY . .

# List the contents of the current directory for debugging
RUN ls -R

# Define the command to run the app
ENTRYPOINT ["node", "app.js"]
