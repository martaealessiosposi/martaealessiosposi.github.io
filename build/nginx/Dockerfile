FROM nginx:latest

# Add your custom configuration files, if needed
COPY src/ /usr/share/nginx/html

# Expose the necessary ports
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]