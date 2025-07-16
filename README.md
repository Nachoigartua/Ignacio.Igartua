# API REST - Sistema de Control de Vuelos

## Descripción

API REST para gestionar aeronaves y sus posiciones cercanas a una torre de control. Permite almacenar, actualizar y listar datos de vuelos, con validaciones y alertas de colisión. Arquitectura MVC, persistencia en memoria, archivos o MongoDB, y autenticación JWT.

## Instalación y uso rápido

1. Clona el repositorio e instala dependencias:
   ```bash
   cd FINALTP2
   npm install
   ```

2. Configura el archivo `.env` (los datos estan en un txt adjuntados en el zip):
   ```
   PORT=...
   PERSISTENCE=...
   MONGO_URL=...
   ```

3. Inicia el servidor:
   ```bash
   npm run watch
   ```

## Endpoints principales

### Login para generar token:
- `POST /login`  
  Envía en los headers `email` y `password` para obtener un token JWT (expira en 5 minutos).

### Vuelos (requiere Token):
- `GET /vuelos`  
  Lista todos los vuelos registrados.
- `POST /vuelos`  
  Crea o actualiza un vuelo.  
  ```
  - Valida formato del id y coordenadas.
  - Si hay peligro de colisión (<500m), retorna array con los ids comprometidos.
  - Si los datos no son válidos, retorna `{ "errorMsg": "datos no válidos" }`.

## Persistencia

- Cambia el modo en `.env` con `PERSISTENCE=memory|fs|mongo`.
- Para MongoDB, completa `MONGO_URL`.
- Para archivos, se crean automáticamente.

## Autenticación

- Todas las rutas de vuelos requieren el token JWT en el header `Authorization`.
- Si el token no es válido o no se envía, retorna `{ "message": "Token inválido." }` y status 401.

## Autor

Ignacio Igartua
