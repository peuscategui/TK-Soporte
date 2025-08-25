FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Instalamos tanto las dependencias de producción como las de desarrollo
RUN npm install
RUN npm install --save-dev @types/passport-jwt

COPY . .

RUN npm run build

EXPOSE 5000

# Configuración de CORS para permitir peticiones del frontend
ENV CORS_ORIGIN=http://192.168.40.79:5001
ENV PORT=5000

# En producción, solo instalamos las dependencias de producción
RUN npm prune --production

CMD ["npm", "run", "start:prod"]