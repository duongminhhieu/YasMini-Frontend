#!/bin/sh

# Generate .env file
echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > /app/.env

# Start nginx
nginx -g 'daemon off;'
