# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the public directory (if required by your build process)
# Make sure this path is correct relative to your WORKDIR
COPY public /usr/src/app/public

# Build the application
RUN npm run build

# Expose the port the application will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
