# NestJS Base Project

Este es un proyecto base de NestJS que incluye funcionalidades básicas como autenticación con API key y un CRUD para un módulo de `Items`. Este proyecto está diseñado para servir como punto de partida para desarrollar aplicaciones más complejas con NestJS.

## Funcionalidades

- **Autenticación con API key**: Protege las rutas del módulo `Items` utilizando una API key.
- **CRUD para Items**: Permite crear, leer, actualizar y eliminar items.
- **Documentación con Swagger**: Incluye una interfaz de Swagger para interactuar con la API y probar las rutas protegidas.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Project setup

### development
```npm run start```

### watch mode
```npm run start:dev```

#### production mode
```npm run start:prod```

## Run tests

# unit tests
```npm run test```

# e2e tests
```npm run test:e2e```

# test coverage
```npm run test:cov```

## Instalación

1. Clona el repositorio:

```git clone https://github.com/tu-usuario/nestjs-base-project.git```
```cd nestjs-base-project```

2. Instala las dependencias:

```npm install```

3. Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y añade la API key:

```env API_KEY=your-secure-api-key```

## Uso

**1. Inicia el servidor de desarrollo:**

npm run start:dev

2. Abre tu navegador y ve a http://localhost:3000/api para acceder a la documentación de Swagger.

**Estructura del Proyecto**
- src/items: Contiene el módulo de Items, incluyendo el servicio y el controlador de Items.
- src/guards: Contiene el guard de API key y el decorador personalizado para proteger las rutas.


**Items**
- GET /items: Obtiene todos los items (requiere API key).
- GET /items/:id: Obtiene un item por ID (requiere API key).
- POST /items: Crea un nuevo item (requiere API key).
- PUT /items/:id: Actualiza un item por ID (requiere API key).
- DELETE /items/:id: Elimina un item por ID (requiere API key).

## Seguridad
Este proyecto utiliza un guard de API key para proteger las rutas del módulo Items. La API key debe ser proporcionada en el encabezado de la solicitud como x-api-key.

