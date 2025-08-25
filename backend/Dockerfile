FROM node:18-alpine

WORKDIR /app

# Copiamos solo los archivos de package.json primero
COPY package*.json ./

# Instalamos todas las dependencias, incluyendo las de desarrollo
RUN npm install
RUN npm install --save-dev @types/passport-jwt

# Copiamos el resto del código
COPY . .

# Verificamos que los archivos necesarios están presentes
RUN ls -la

# Ejecutamos el build
RUN npm run build

# Verificamos que dist se creó correctamente
RUN ls -la dist/

EXPOSE 5000

# Configuración de variables de entorno
ENV CORS_ORIGIN=http://192.168.40.79:5001
ENV PORT=5000

# Limpiamos las dependencias de desarrollo
RUN npm prune --production

# Especificamos la ruta completa al archivo main.js
CMD ["node", "dist/main.js"]