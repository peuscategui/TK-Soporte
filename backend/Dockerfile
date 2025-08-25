FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Configuración de CORS para permitir peticiones del frontend
ENV CORS_ORIGIN=http://192.168.40.79:3001

CMD ["npm", "run", "start:prod"]