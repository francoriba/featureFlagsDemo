FROM node:18-alpine
WORKDIR /app
COPY ../app/package*.json ./
# Install dependencies
RUN npm install --production 
# Copy the app to the container
COPY ../app .
COPY ../app/.env ./
EXPOSE 3000
# Run the app inside the container
CMD ["npm", "start"]
