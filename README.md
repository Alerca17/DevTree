# DevTree

DevTree es una plataforma ligera y extensible diseñada para que cualquier persona —creadores de contenido, profesionales independientes, pequeñas empresas o comunidades— pueda centralizar y presentar sus enlaces importantes en una sola página pública. La aplicación combina una interfaz moderna y responsive en el frontend con una API segura en el backend, proporcionando una experiencia rápida y fácil de personalizar.

El objetivo principal de `DevTree` es permitir que el usuario configure en minutos un perfil público donde agrupar redes sociales, portafolios, recursos y botones de contacto, todo administrable desde un panel privado. La arquitectura está pensada para ser: 1) sencilla de desplegar localmente o en la nube, 2) fácil de extender (API-first) y 3) segura, usando JWT para autenticación y buenas prácticas en el manejo de credenciales.

Características destacadas y beneficios inmediatos:

- Perfil público personalizable con imagen, handle, descripción y enlaces ordenables.
- Panel administrativo protegido para gestionar enlaces y datos del perfil.
- Autenticación basada en JWT con persistencia en el frontend y validación en el backend.
- Integración opcional con Cloudinary para gestión de imágenes y uploads.
- Código modular (React + Vite en frontend; Express + TypeScript + Mongoose en backend) pensado para aprender, extender y desplegar.

Esta versión incluye funcionalidades esenciales y una base lista para añadir mejoras como analytics, agendado de enlaces, enlaces temporales y opciones de tematización. Si buscas una solución autocontrollable y personalizable para mostrar tu presencia web, `DevTree` es una base sólida sobre la que iterar.

## Estado actual

Funcionalidades implementadas:

- Registro de usuarios.
- Login con generación de token JWT.
- Persistencia del token en `localStorage`.
- Envío automático del token en peticiones al backend mediante interceptor de Axios.
- Validación de rutas protegidas desde el frontend usando React Query.
- Ruta protegida en backend para obtener usuario autenticado.
- Panel admin básico con pestañas (Links y Mi Perfil).
- Vista pública de links del usuario (`LinkTreeView`).
- Persistencia final del formulario de perfil (handle, descripción, imagen).
- Lógica de cerrar sesión.

## Quick start

Requisitos: Node.js 18+ y npm 9+ (o versiones actuales LTS). MongoDB disponible (local o URI remota).

1. Instalar dependencias:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

2. Variables de entorno: copiar ejemplos y rellenar valores.

```bash
# Backend
copy Backend\.env.example Backend\.env

# Frontend
copy Frontend\.env.local.example Frontend\.env.local
```

3. Ejecutar en desarrollo (en dos terminales):

```bash
cd Backend
npm run dev

cd ../Frontend
npm run dev
```

Por defecto:

- API: http://localhost:4000
- Frontend: http://localhost:5173

## Variables de entorno (resumen)

Backend (copiar `Backend/.env.example` -> `Backend/.env`):

- `PORT` — puerto del servidor (ej. 4000)
- `MONGO_URI` — conexión a MongoDB
- `FRONTEND_URL` — URL del frontend para CORS
- `JWT_SECRET` — clave para firmar JWT (obligatorio)
- `CLOUDINARY_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — (opcional) para subir imágenes

Frontend (copiar `Frontend/.env.local.example` -> `Frontend/.env.local`):

- `VITE_API_URL` — URL base de la API (ej. http://localhost:4000)

Nota: no subas archivos `.env` con credenciales al repositorio.

## Endpoints principales (resumen)

- `POST /auth/register` — registra nuevo usuario
  - Payload: `{ name, email, handle, password }`

- `POST /auth/login` — autentica y devuelve JWT
  - Payload: `{ email, password }`

- `GET /user` — devuelve usuario autenticado (sin password)
  - Header: `Authorization: Bearer <token>`

Para detalles y ejemplos de respuesta, considera añadir una collection Postman o especificación OpenAPI.

## Estructura del proyecto

```text
DevTree/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── handlers/
     │   ├── middleware/
     │   ├── models/
     │   └── utils/
│   └── package.json
└── Frontend/
        ├── src/
        │   ├── api/
        │   ├── Components/
        │   ├── config/
        │   ├── layouts/
        │   ├── types/
        │   └── views/
        └── package.json
```

## Scripts (resumen)

Backend (`Backend/package.json`):

- `npm run dev` — arranca en modo desarrollo con `nodemon` y `ts-node`.
- `npm run dev:api` — variante de desarrollo.
- `npm run build` — compila TypeScript a `dist`.
- `npm start` — ejecuta `dist/index.js`.

Frontend (`Frontend/package.json`):

- `npm run dev` — arranca Vite en modo dev.
- `npm run build` — build de producción.
- `npm run preview` — preview del build.
- `npm run lint` — lint con ESLint.

## Recomendaciones / siguientes pasos

- Añadir tests básicos (Jest / RTL para frontend, algún test para backend) y script `npm test`.
- Configurar CI (GitHub Actions) para ejecutar lint/build/tests y publicar badges.
- Añadir un `docker-compose.yml` para facilitar despliegue local con MongoDB.

## Autores

- Alejandro Correa
- Andres Alvarez

## Historial de cambios

- 2026-06-05: Actualización del README — correcciones y clarificaciones.
