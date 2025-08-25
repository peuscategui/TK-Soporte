# TK Soporte

Sistema de gestión de tickets de soporte técnico.

## Requisitos

- Docker
- Docker Compose
- EasyPanel instalado en el servidor Ubuntu

## Configuración para EasyPanel

1. En EasyPanel, seleccionar "Github" como método de despliegue
2. Configurar el proyecto:
   - Owner: peuscategui
   - Repository: TK-Soporte
   - Branch: master
   - Build Path: /

NOTA: Asegúrate de tener configurado el token de GitHub en Settings si el repositorio es privado.

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