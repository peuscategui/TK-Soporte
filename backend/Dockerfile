FROM node:18-alpine

WORKDIR /app

# Copiamos solo los archivos de package.json primero
COPY package*.json ./

# Instalamos todas las dependencias, incluyendo las de desarrollo
RUN npm install --legacy-peer-deps
RUN npm install --save-dev @types/passport-jwt

# Copiamos el resto del código
COPY . .

# Mostramos el contenido antes del build
RUN echo "Contents before build:" && ls -la

# Limpiamos cualquier build anterior
RUN rm -rf dist

# Compilamos el proyecto
RUN npm run build

# Verificamos el contenido después del build
RUN echo "Contents after build:" && ls -la && \
    echo "Contents of dist directory:" && ls -la dist/

# Copiamos el contenido compilado a un directorio limpio
RUN mkdir -p /dist && \
    cp -r dist/* /dist && \
    cp package*.json /dist/

# Cambiamos al directorio limpio
WORKDIR /dist

# Instalamos solo las dependencias de producción
RUN npm install --production --legacy-peer-deps

# Verificamos el contenido final
RUN echo "Final contents:" && ls -la

EXPOSE 5000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=5000
ENV CORS_ORIGIN=http://192.168.40.79:5001

# Ejecutamos directamente el archivo compilado
CMD ["node", "main.js"]