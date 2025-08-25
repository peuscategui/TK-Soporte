# TK Soporte

Sistema de gestión de tickets de soporte técnico.

## Requisitos

- Docker y Docker Compose
- Node.js 18+ (para desarrollo)
- PostgreSQL (incluido en Docker)

## Instalación con Docker

1. Clonar el repositorio:
```bash
git clone <tu-repositorio>
cd tksoporte
```

2. Construir y levantar los contenedores:
```bash
docker-compose up -d
```

La aplicación estará disponible en:
- Frontend: http://localhost
- Backend: http://localhost/api

## Desarrollo local

### Backend

1. Instalar dependencias:
```bash
cd backend
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

3. Iniciar en modo desarrollo:
```bash
npm run start:dev
```

### Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Iniciar en modo desarrollo:
```bash
npm start
```

## Estructura del proyecto

```
.
├── backend/             # API NestJS
├── frontend/           # Aplicación React
├── docker-compose.yml  # Configuración Docker
└── README.md
```

## Características

- Dashboard con estadísticas y gráficos
- Gestión de tickets
- Sistema de autenticación
- Interfaz responsive
- Gráficos interactivos

## Despliegue en producción

1. Configurar variables de entorno:
```bash
# Backend
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña_segura
DB_DATABASE=tksoporte
```

2. Construir y desplegar:
```bash
docker-compose -f docker-compose.prod.yml up -d
```
