# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code from the root directory
COPY . .

# Expose the port your Node.js app listens on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]