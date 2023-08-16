#!/bin/sh -l

# Navigate to the action's directory
cd /action

# Install npm packages
npm install

# Execute the JavaScript file
node ./prLabeler.js