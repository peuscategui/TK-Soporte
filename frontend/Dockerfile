FROM node:18-alpine as build

WORKDIR /app

# Copiamos los archivos de package.json primero
COPY package*.json ./

# Limpiamos la caché de npm y el directorio node_modules si existe
RUN rm -rf node_modules
RUN npm cache clean --force

# Instalamos todas las dependencias con --legacy-peer-deps
RUN npm install --legacy-peer-deps
RUN npm install jwt-decode@3.1.2 --legacy-peer-deps

# Variables de entorno para el build
ENV REACT_APP_API_URL=http://192.168.40.79:5000
ENV PORT=5001
ENV NODE_ENV=production

# Copiamos el resto del código
COPY . .

# Verificamos el contenido
RUN echo "Contents before build:" && ls -la

# Construimos la aplicación
RUN npm run build

# Verificamos el contenido del build
RUN echo "Contents of build directory:" && ls -la build/

# Etapa de producción
FROM nginx:alpine

# Copiamos la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos los archivos construidos
COPY --from=build /app/build /usr/share/nginx/html

# Verificamos el contenido final
RUN echo "Final contents:" && ls -la /usr/share/nginx/html/

EXPOSE 5001

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]