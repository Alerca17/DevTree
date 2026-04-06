# DevTree

DevTree es una aplicación web tipo **Linktree** construida con **React + Vite** en el frontend y **Express + TypeScript + MongoDB** en el backend.

La idea principal es que cada usuario tenga un perfil público sencillo, ordenado y fácil de compartir, donde pueda reunir sus enlaces más importantes en una sola página. En lugar de mandar a las personas a varias redes o sitios distintos, DevTree concentra todo en un único enlace con una interfaz limpia y pensada para que el acceso a la información sea rápido.

El proyecto mezcla dos partes claras: una capa pública orientada a mostrar enlaces y una capa de autenticación que permite crear y gestionar usuarios. Esto lo convierte en una base útil para un clon funcional de Linktree, con margen para crecer hacia perfiles personalizados, administración de links y personalización visual.

El proyecto actualmente incluye:

- Pantalla de inicio de sesión.
- Pantalla de registro de usuarios.
- Validación de formularios en frontend y backend.
- Conexión a MongoDB.
- Manejo de errores y notificaciones.

## Tecnologías

- Frontend: React, Vite, React Router, React Hook Form, Axios, Tailwind CSS, Sonner.
- Backend: Node.js, Express, TypeScript, Mongoose, Express Validator, bcrypt, cors, dotenv.

## Descripción General

DevTree está pensado para resolver un caso de uso muy concreto: centralizar enlaces personales o profesionales en una sola página de destino. Esa página puede representar a una persona, un creador de contenido, una marca o un proyecto, y sirve como punto de entrada hacia redes sociales, portafolios, repositorios, formularios de contacto o cualquier recurso relevante.

En términos de experiencia, el objetivo es que el usuario pueda registrarse, ingresar a su cuenta y luego administrar su presencia pública desde una interfaz simple. El diseño prioriza la claridad: menos navegación, más foco en los enlaces importantes y una estructura fácil de usar desde desktop o móvil.

## Cómo Funciona

1. El usuario entra al frontend y accede a las pantallas de login o registro.
2. El formulario envía los datos al backend, donde se validan los campos y se almacenan en MongoDB.
3. El backend responde con mensajes de éxito o error según corresponda.
4. El frontend muestra alertas y mensajes visuales para guiar al usuario.
5. La configuración de `VITE_API_URL`, `PORT` y `FRONTEND_URL` mantiene la comunicación entre ambos proyectos.

## Estructura

```text
DevTree/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── handlers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── utils/
│   └── package.json
└── Frontend/
    ├── src/
    │   ├── Components/
    │   ├── config/
    │   ├── layouts/
    │   ├── types/
    │   └── views/
    └── package.json
```

## Requisitos

- Node.js instalado.
- Una base de datos MongoDB disponible localmente o en Atlas.

## Variables de entorno

### Backend

Copiar `Backend/.env.example` a `Backend/.env` y ajustar los valores:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/devtree
FRONTEND_URL=http://localhost:5173
```

### Frontend

Copiar `Frontend/.env.local.example` a `Frontend/.env.local`:

```env
VITE_API_URL=http://localhost:4000
```

## Instalación

Instala dependencias en cada carpeta por separado:

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

## Ejecución en desarrollo

### Backend

```bash
cd Backend
npm run dev
```

El servidor se levanta en `http://localhost:4000` por defecto.

### Frontend

```bash
cd Frontend
npm run dev
```

La aplicación de Vite se levanta normalmente en `http://localhost:5173`.

## Scripts disponibles

### Backend

- `npm run dev`: ejecuta el servidor con nodemon.
- `npm run build`: compila TypeScript.
- `npm start`: ejecuta la versión compilada.

### Frontend

- `npm run dev`: inicia el entorno de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: previsualiza la build.
- `npm run lint`: ejecuta ESLint.

## Funcionalidades actuales

### Frontend

- Ruta de login en `/auth/login`.
- Ruta de registro en `/auth/register`.
- Formulario de registro con validaciones para nombre, email, handle, password y confirmación.
- Mensajes visuales de error.
- Notificaciones con `sonner`.

### Backend

- Conexión a MongoDB con Mongoose.
- Registro de usuarios con validación de entrada.
- Normalización del handle con `slug`.
- Validación de email, password y campos obligatorios.
- Login con verificación de contraseña usando `bcrypt`.

## Endpoints

### `POST /auth/register`

Registra un usuario nuevo.

Campos esperados:

- `name`
- `email`
- `handle`
- `password`
- `password_confirmation` en el frontend, usado para validar antes de enviar

### `POST /auth/login`

Inicia sesión con:

- `email`
- `password`

## Notas

- Asegúrate de que el backend esté corriendo antes de abrir el frontend.
- El frontend consume la API usando `VITE_API_URL`.
- El backend acepta peticiones solo desde `FRONTEND_URL` por la configuración de CORS.

## Estado del proyecto

La base actual está enfocada en autenticación y es la base para un clon de Linktree. El siguiente paso natural es agregar persistencia de sesión, perfiles de usuario y la pantalla principal con enlaces del usuario.
