# TaskFlow API

REST API para la gestión de proyectos y tareas, desarrollada con **Node.js, Express y Firebase Firestore**.

El proyecto implementa autenticación mediante **JWT almacenado en cookies HTTP-only**, validación de datos con **Zod**, autorización basada en el usuario propietario de cada recurso y un manejo global de errores.

## 🚀 Tecnologías

- Node.js
- Express 5
- Firebase Admin SDK
- Firebase Firestore
- JWT
- bcryptjs
- Zod
- Cookie Parser
- CORS
- Morgan
- dotenv

## ✨ Características

### Autenticación

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Consulta del perfil autenticado
- Contraseñas almacenadas mediante hash con bcrypt
- Autenticación mediante JWT
- JWT almacenado en cookie `httpOnly`
- Middleware de autenticación

### Proyectos

Cada usuario puede:

- Crear proyectos
- Obtener sus proyectos
- Obtener un proyecto específico
- Actualizar sus proyectos
- Eliminar sus proyectos

### Tareas

Cada tarea pertenece a un proyecto.

Los usuarios pueden:

- Crear tareas
- Obtener sus tareas
- Obtener una tarea específica
- Actualizar tareas
- Eliminar tareas

Las tareas no pueden modificarse para pertenecer a otro proyecto mediante `updateTask`.

### Validación

Los datos recibidos por la API son validados mediante **Zod 4**.

Los schemas utilizados son:

- `registerSchema`
- `loginSchema`
- `createProjectSchema`
- `updateProjectSchema`
- `createTaskSchema`
- `updateTaskSchema`

### Manejo de errores

La API utiliza un middleware global para centralizar el manejo de errores inesperados.

## 📁 Estructura del proyecto

```text
taskflow-api/
│
├── src/
│   ├── config/
│   │   └── firebase.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   │
│   ├── middlewares/
│   │   ├── authRequired.js
│   │   ├── errorHandler.js
│   │   └── validateSchema.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
│   │
│   ├── schemas/
│   │   ├── auth.schema.js
│   │   ├── project.schema.js
│   │   └── task.schema.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── app.js
│   └── index.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Instalación

Cloná el repositorio:

```bash
git clone <REPOSITORY_URL>
```

Entrá al proyecto:

```bash
cd taskflow-api
```

Instalá las dependencias:

```bash
npm install
```

## 🔐 Variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

También existe un `.env.example` como referencia.

## 🔥 Configuración de Firebase

Para utilizar Firestore necesitás crear un proyecto en Firebase y generar una credencial de **Firebase Admin SDK**.

Colocá el archivo de credenciales en:

```text
src/config/serviceAccountKey.json
```

Este archivo contiene información sensible y está incluido en `.gitignore`, por lo que **no debe subirse al repositorio**.

El archivo `firebase.js` inicializa Firebase Admin y establece la conexión con Firestore.

## ▶️ Ejecutar el proyecto

Para desarrollo:

```bash
npm run dev
```

Para ejecutar el servidor:

```bash
npm start
```

Por defecto, la API estará disponible en:

```text
http://localhost:3000
```

## 📡 Endpoints

### Authentication

| Método | Endpoint             | Auth | Descripción       |
| ------ | -------------------- | ---- | ----------------- |
| POST   | `/api/auth/register` | ❌   | Registrar usuario |
| POST   | `/api/auth/login`    | ❌   | Iniciar sesión    |
| POST   | `/api/auth/logout`   | ❌   | Cerrar sesión     |
| GET    | `/api/auth/profile`  | ✅   | Obtener perfil    |

### Projects

| Método | Endpoint            | Auth | Descripción                   |
| ------ | ------------------- | ---- | ----------------------------- |
| GET    | `/api/projects`     | ✅   | Obtener proyectos del usuario |
| GET    | `/api/projects/:id` | ✅   | Obtener un proyecto           |
| POST   | `/api/projects`     | ✅   | Crear proyecto                |
| PUT    | `/api/projects/:id` | ✅   | Actualizar proyecto           |
| DELETE | `/api/projects/:id` | ✅   | Eliminar proyecto             |

### Tasks

| Método | Endpoint         | Auth | Descripción       |
| ------ | ---------------- | ---- | ----------------- |
| GET    | `/api/tasks`     | ✅   | Obtener tareas    |
| GET    | `/api/tasks/:id` | ✅   | Obtener una tarea |
| POST   | `/api/tasks`     | ✅   | Crear tarea       |
| PUT    | `/api/tasks/:id` | ✅   | Actualizar tarea  |
| DELETE | `/api/tasks/:id` | ✅   | Eliminar tarea    |

## 🔑 Autenticación

La autenticación utiliza JWT almacenado en una cookie:

```text
token
```

La cookie está configurada como `httpOnly`, evitando que JavaScript del navegador pueda acceder directamente al token.

Los endpoints protegidos requieren que la cookie de autenticación sea enviada junto con la petición.

## 📋 Ejemplo de registro

### Request

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

Después del registro, la API establece automáticamente la cookie de autenticación.

## 📋 Ejemplo de proyecto

### Request

```http
POST /api/projects
Content-Type: application/json
```

```json
{
  "title": "TaskFlow API",
  "description": "Backend para gestión de proyectos y tareas",
  "status": "active"
}
```

## 📋 Ejemplo de tarea

### Request

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Crear autenticación",
  "description": "Implementar JWT y cookies",
  "status": "pending",
  "priority": "high",
  "projectId": "project_id"
}
```

## 🛡️ Seguridad

El proyecto implementa varias medidas de seguridad:

- Contraseñas protegidas con bcrypt
- JWT firmado mediante una variable de entorno
- Cookies `httpOnly`
- Validación de datos con Zod
- Autorización basada en el propietario del recurso
- Credenciales de Firebase excluidas de Git
- Variables sensibles excluidas del repositorio
- CORS configurado para aceptar únicamente el origen definido

## 📌 Próximas mejoras

Algunas funcionalidades que podrían agregarse en futuras versiones:

- Refresh tokens
- Recuperación de contraseña
- Paginación
- Filtrado y búsqueda de tareas
- Ordenamiento por fecha o prioridad
- Documentación con Swagger / OpenAPI
- Tests automatizados
- Rate limiting

## 👨‍💻 Autor

Desarrollado como proyecto de práctica y portfolio para demostrar conocimientos de desarrollo backend y construcción de APIs REST con Node.js.
