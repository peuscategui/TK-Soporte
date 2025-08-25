FROM node:18-alpine

WORKDIR /app

# Copiamos solo los archivos de package.json primero
COPY package*.json ./

# Instalamos todas las dependencias, incluyendo las de desarrollo
RUN npm install --legacy-peer-deps
RUN npm install --save-dev @types/passport-jwt

# Copiamos el resto del código
COPY . .

# Mostramos el contenido del directorio
RUN echo "Contents of /app before build:" && ls -la

# Limpiamos cualquier build anterior
RUN rm -rf dist

# Ejecutamos el build
RUN npm run build

# Verificamos que dist se creó correctamente
RUN echo "Contents of /app after build:" && ls -la && echo "Contents of /app/dist:" && ls -la dist/

EXPOSE 5000

# Configuración de variables de entorno
ENV NODE_ENV=production
ENV CORS_ORIGIN=http://192.168.40.79:5001
ENV PORT=5000

# Limpiamos las dependencias de desarrollo
RUN npm prune --production

# Verificamos el contenido final
RUN echo "Final contents of /app/dist:" && ls -la dist/

# Usamos el comando start:prod del package.json
CMD ["npm", "run", "start:prod"]