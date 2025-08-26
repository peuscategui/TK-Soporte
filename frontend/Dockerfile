FROM node:18-alpine as build

WORKDIR /app

# Copiamos los archivos de package.json primero
COPY package*.json ./

# Instalamos dependencias y jwt-decode explícitamente
RUN npm install --legacy-peer-deps
RUN npm install jwt-decode

# Variables de entorno para el build
ENV REACT_APP_API_URL=http://192.168.40.79:5000
ENV PORT=5001

# Copiamos el resto del código
COPY . .

# Verificamos el contenido
RUN echo "Contents before build:" && ls -la

# Instalamos cualquier dependencia faltante y construimos
RUN npm install --legacy-peer-deps
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