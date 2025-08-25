# TK Soporte

Sistema de gestión de tickets de soporte técnico.

## Requisitos

- Docker
- Docker Compose
- EasyPanel instalado en el servidor Ubuntu

## Configuración para EasyPanel

1. En EasyPanel, crear un nuevo proyecto
2. Seleccionar "Custom Project"
3. Configurar el proyecto:
   - Name: tksoporte
   - Repository URL: https://github.com/peuscategui/TK-Soporte.git
   - Branch: master
   - Build Command: docker-compose up -d --build
   - Port: 80

## Variables de Entorno

### Backend
- NODE_ENV=production
- DATABASE_HOST=192.168.40.129
- DATABASE_PORT=5432
- DATABASE_USER=postgres
- DATABASE_PASSWORD=postgres
- DATABASE_NAME=postgres

## Despliegue Manual

```bash
# Clonar el repositorio
git clone https://github.com/peuscategui/TK-Soporte.git
cd TK-Soporte

# Construir y levantar los contenedores
docker-compose up -d --build
```

## Acceso

- Frontend: http://tu-dominio
- Backend API: http://tu-dominio/api

## Mantenimiento

Para ver los logs:
```bash
docker-compose logs -f
```

Para reiniciar los servicios:
```bash
docker-compose restart
```

Para detener los servicios:
```bash
docker-compose down
```