#!/bin/sh

# Generate .env file
echo "VITE_BACKEND_URL=abc.com" > /app/.env

# Start nginx
nginx -g 'daemon off;'
