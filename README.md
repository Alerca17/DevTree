# DevTree

DevTree es una aplicacion web tipo Linktree creada con React + Vite en el frontend y Express + TypeScript + MongoDB en el backend.

La meta del proyecto es que cada usuario pueda gestionar su perfil y centralizar sus enlaces en una sola pagina publica. En este momento ya existe autenticacion funcional, acceso protegido al panel interno y una base lista para continuar con la gestion de links.

## Estado actual

Actualmente el proyecto ya permite:

- Registro de usuarios.
- Login con generacion de token JWT.
- Persistencia del token en localStorage.
- Envio automatico del token en peticiones al backend mediante interceptor de Axios.
- Validacion de rutas protegidas desde el frontend usando React Query.
- Ruta protegida en backend para obtener usuario autenticado.
- Base de panel admin con navegacion por pestañas (Links y Mi Perfil).

Tambien hay modulos en construccion:

- Vista de links del usuario (LinkTreeView) como placeholder.
- Formulario de perfil con campos base (handle, descripcion, imagen) sin persistencia final todavia.
- Boton de cerrar sesion aun sin logica implementada.

## Stack tecnologico

### Frontend

- React 19
- Vite
- React Router
- React Hook Form
- TanStack React Query + React Query Devtools
- Axios
- Tailwind CSS
- Heroicons
- Sonner

### Backend

- Node.js
- Express
- TypeScript
- Mongoose
- Express Validator
- bcrypt
- jsonwebtoken
- cors
- dotenv

## Estructura del proyecto

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
    │   ├── api/
    │   ├── Components/
    │   ├── config/
    │   ├── layouts/
    │   ├── types/
    │   └── views/
    └── package.json
```

## Flujo actual de autenticacion

1. El usuario se registra en /auth/register.
2. El usuario inicia sesion en /auth/login.
3. El backend responde con un JWT.
4. El frontend guarda el token en localStorage como AUTH_TOKEN.
5. Axios adjunta Authorization: Bearer <token> en cada request.
6. React Query consulta /user para validar sesion y cargar datos del usuario.
7. Si falla la autenticacion, el usuario se redirige a /auth/login.

## Rutas del frontend

- /auth/login
- /auth/register
- /admin (panel principal)
- /admin/profile

## Endpoints del backend

### POST /auth/register

Registra un nuevo usuario.

Campos esperados:

- name
- email
- handle
- password

Nota: password_confirmation se valida en frontend antes de enviar.

### POST /auth/login

Autentica al usuario y devuelve un JWT.

Campos esperados:

- email
- password

### GET /user

Devuelve el usuario autenticado (sin password).

Requiere header:

- Authorization: Bearer <token>

## Variables de entorno

### Backend

Copiar Backend/.env.example a Backend/.env y definir:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/devtree
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_clave_super_secreta
```

Importante: JWT_SECRET es obligatorio para firmar y validar tokens.

### Frontend

Copiar Frontend/.env.local.example a Frontend/.env.local:

```env
VITE_API_URL=http://localhost:4000
```

## Instalacion

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

## Ejecucion en desarrollo

### Backend

```bash
cd Backend
npm run dev
```

### Frontend

```bash
cd Frontend
npm run dev
```

Por defecto:

- API: http://localhost:4000
- Frontend: http://localhost:5173

## Scripts

### Backend

- npm run dev
- npm run dev:api
- npm run build
- npm start

### Frontend

- npm run dev
- npm run build
- npm run preview
- npm run lint

## Autores

- Alejandro Correa
- Andres Alvarez

Nota: los perfiles de GitHub son opcionales, pero se pueden agregar para facilitar contacto y portafolio.
