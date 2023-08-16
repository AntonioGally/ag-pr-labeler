FROM node:16

# Copy the repository contents to the container
COPY . /action

# Set the working directory
WORKDIR /action

# Install the dependencies
RUN npm install

# Set the entrypoint
ENTRYPOINT ["./entrypoint.sh"]
