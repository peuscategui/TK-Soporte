FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

# Configuración de CORS para permitir peticiones del frontend
ENV CORS_ORIGIN=http://192.168.40.79:5001
ENV PORT=5000

CMD ["npm", "run", "start:prod"]