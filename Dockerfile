FROM node:16

# Copy the repository contents to the container
COPY . /action

# Set the working directory
WORKDIR /action

# Ensure the script is executable
RUN chmod +x /action/entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/action/entrypoint.sh"]
