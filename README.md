# Plataforma de Inscripciones UTT

Este proyecto es un sistema de gestión de inscripciones para la Universidad Tecnológica de Tehuacán, construido con una arquitectura de microservicios en Node.js y un frontend en Angular.

## Arquitectura del Proyecto

El sistema está desacoplado en varios servicios independientes, cada uno con una responsabilidad única. Un API Gateway actúa como punto de entrada único para el frontend, simplificando la comunicación.

-   **Frontend (`/frontend/uttinscripciones`)**: Una aplicación de página única (SPA) desarrollada con Angular. Es la interfaz con la que interactúan los estudiantes.

-   **API Gateway (`/gateway`)**: Un servidor Express que actúa como intermediario entre el cliente y los microservicios. Enruta las peticiones entrantes al servicio correspondiente.
    -   Puerto: `3000`

-   **Servicio de Registro (`/services/registro-service`)**: Gestiona la creación de nuevas cuentas de usuario.
    -   Puerto: `3002`
    -   Endpoint principal: `POST /auth/register`

-   **Servicio de Login (`/services/login-service`)**: Maneja la autenticación de usuarios y la generación de tokens JWT.
    -   Puerto: `3001`
    -   Endpoint principal: `POST /auth/login`

-   **Servicio de Formulario de Inscripción (`/services/formulario-incripcion-service`)**: Controla la lógica del formulario de inscripción para usuarios autenticados.
    -   Puerto: `3003`
    -   Endpoints principales: `POST /api/inscripciones`, `GET /api/inscripciones/status`

## Tecnologías y Dependencias por Servicio

A continuación se detallan las tecnologías y librerías principales utilizadas en cada componente del proyecto.

### Frontend (`/frontend/uttinscripciones`)
-   **Framework**: Angular
-   **Lenguaje**: TypeScript
-   **Librerías clave**: RxJS para programación reactiva.

### API Gateway (`/gateway`)
-   `express`: Framework web para Node.js.
-   `cors`: Middleware para habilitar Cross-Origin Resource Sharing.
-   `express-http-proxy`: Middleware para redirigir peticiones a los microservicios.
-   `morgan`: Middleware para el logging de peticiones HTTP.

### Servicio de Registro (`/services/registro-service`)
-   `express`: Framework web.
-   `mongoose`: ODM para interactuar con MongoDB.
-   `bcryptjs`: Librería para hashear contraseñas.
-   `dotenv`: Para gestionar variables de entorno.
-   `cors`: Middleware para habilitar CORS.
-   `nodemon`: Para reiniciar el servidor automáticamente en desarrollo.

### Servicio de Login (`/services/login-service`)
-   `express`: Framework web.
-   `mongoose`: ODM para MongoDB.
-   `bcryptjs`: Para comparar contraseñas hasheadas.
-   `jsonwebtoken`: Para la creación y verificación de tokens JWT.
-   `dotenv`: Para gestionar variables de entorno.
-   `cors`: Middleware para habilitar CORS.
-   `nodemon`: Para desarrollo.

### Servicio de Formulario (`/services/formulario-incripcion-service`)
-   `express`: Framework web.
-   `mongoose`: ODM para MongoDB.
-   `jsonwebtoken`: Para decodificar y verificar el token del usuario.
-   `dotenv`: Para gestionar variables de entorno.
-   `cors`: Middleware para habilitar CORS.
-   `nodemon`: Para desarrollo.

## Guía de Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos

-   Node.js y npm
-   Angular CLI (`npm install -g @angular/cli`)
-   Una instancia de MongoDB corriendo (local o en la nube).

### 1. Clonar el Repositorio

```sh
git clone https://github.com/SoyAri/UTT-Inscripciones
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Configurar Variables de Entorno

Cada microservicio que requiere conexión a la base de datos o usa JWT necesita un archivo `.env`. Crea un archivo `.env` en la raíz de los siguientes directorios:
-   `services/login-service/`
-   `services/registro-service/`
-   `services/formulario-incripcion-service/`

Añade el siguiente contenido a cada uno de esos archivos `.env`, ajustando los valores a tu configuración:

```env
# URL de conexión a tu base de datos MongoDB
MONGO_URI=mongodb://localhost:27017/uttinscripciones_db

# Clave secreta para firmar los tokens JWT (debe ser la misma en todos los servicios)
JWT_SECRET=tu_clave_secreta_super_segura_aqui
```

### 3. Instalar Dependencias

Abre una terminal para cada servicio (y el gateway) y para el frontend. Ejecuta `npm install` en cada uno de sus directorios para instalar las librerías listadas en sus respectivos `package.json`.

```sh
# En una terminal para el Gateway
cd gateway
npm install

# En otra terminal para el Login Service
cd services/login-service
npm install

# Y así sucesivamente para registro-service, formulario-incripcion-service y frontend/uttinscripciones...
```

### 4. Ejecutar los Servicios

Mantén una terminal abierta para cada proceso. Ejecuta el comando `npm start` (o `npm run dev` si usas nodemon) en cada uno de los directorios de los servicios y del gateway.

-   **Gateway**: `cd gateway && npm start` (Correrá en `http://localhost:3000`)
-   **Login Service**: `cd services/login-service && npm start` (Correrá en `http://localhost:3001`)
-   **Registro Service**: `cd services/registro-service && npm start` (Correrá en `http://localhost:3002`)
-   **Formulario Service**: `cd services/formulario-incripcion-service && npm start` (Correrá en `http://localhost:3003`)

### 5. Ejecutar el Frontend

Finalmente, en el directorio del frontend, ejecuta la aplicación de Angular.

```sh
cd frontend/uttinscripciones
npm start
```

Abre tu navegador y visita `http://localhost:4200`. La aplicación debería estar funcionando.