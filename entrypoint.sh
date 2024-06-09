#!/bin/sh

# Generate .env file
# echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > /app/.env


# Replace environment variables in JavaScript files
# for file in /usr/share/nginx/html/assets/*.js; do
#   sed -i "s|VITE_BACKEND_URL_PLACEHOLDER|$VITE_BACKEND_URL|g" $file
# done

# Start nginx
nginx -g 'daemon off;'
