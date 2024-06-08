#!/bin/sh

# Replace environment variables in JavaScript files
for file in /usr/share/nginx/html/assets/*.js; do
  sed -i "s|VITE_BACKEND_URL_PLACEHOLDER|$VITE_BACKEND_URL|g" $file
done

exec "$@"
