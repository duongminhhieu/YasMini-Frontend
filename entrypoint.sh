#!/bin/sh

# Generate .env file
echo "VITE_BACKEND_URL=${PROD_URL}" > /app/.env

# Start nginx
nginx -g 'daemon off;'
