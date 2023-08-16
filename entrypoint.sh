#!/bin/sh -l

# Navigate to the action's directory
cd $GITHUB_WORKSPACE

# Install npm packages
npm install

# Execute the JavaScript file
node prLabeler.js