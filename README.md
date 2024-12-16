
# Backend Challenge: API para Gestión Inmobiliaria

## Descripción General
Esta API RESTful permite la gestión de bienes raíces, incluyendo propiedades, transacciones, usuarios y listados. El sistema está diseñado para cubrir necesidades de administración tanto de usuarios como de operaciones inmobiliarias.

## Tecnologías Utilizadas
- **Framework**: NestJS (Node.js)
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: JSON Web Tokens (JWT)
- **Contenerización**: Docker y Docker Compose

## Enlace del Deploy
[Enlace del deploy en EC2](http://ec2-54-198-100-159.compute-1.amazonaws.com:3000/)

## Sugerencias para Configuración
Es recomendable generar un archivo `.env` y modificar el archivo `docker-compose.yml` si lo desean. Si solo quieren crear el `.env`, sugeriría usar las siguientes configuraciones para que puedan probar bien las migraciones:

```env
JWT_SECRET_KEY=miClaveSecretaSuperSegura
JWT_EXPIRES=1h
DB_HOST=db
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_NAME=red-atlas-db
PORT=3000
```

## Enlace de la Documentación
[Documentación en Postman](https://documenter.getpostman.com/view/12355254/2sAYHxoPw1)  
**Nota**: Por defecto, la URL de la API es `http://localhost:3000`.

## Instalación y Ejecución
1. Primero, instala las dependencias y ejecuta el servidor en modo desarrollo:

    ```bash
    npm run start:dev
    ```

2. Si necesitas ejecutar migraciones, utiliza los siguientes comandos:

    ```bash
    # Generar migraciones
    npm run migration:generate -- -d ./src/data-source.ts src/migrations/initial

    # Ejecutar migraciones
    npm run migration:run -- -d ./src/data-source.ts
    ```

## Requisitos Previos
- Node.js v latest
- Docker y Docker Compose

## Configurar el Entorno
Las variables de entorno están definidas en el archivo `docker-compose.yml`. Estas variables incluyen:

- **JWT_SECRET_KEY**: Clave secreta para JWT.
- **JWT_EXPIRES**: Tiempo de expiración del JWT (por defecto "1h").
- **DB_HOST**: Host del contenedor de la base de datos.
- **DB_PORT**: Puerto de la base de datos (usualmente "5432").
- **DB_USERNAME**: Usuario de la base de datos.
- **DB_PASSWORD**: Contraseña de la base de datos.
- **DB_NAME**: Nombre de la base de datos.
- **PORT**: Puerto donde corre la API (por defecto "3000").

## Construir y Levantar los Contenedores
Ejecuta el siguiente comando para levantar la aplicación y la base de datos en contenedores:

```bash
docker-compose up --build
```

Esto iniciará la aplicación NestJS y la base de datos PostgreSQL.

**Nota**: Se creó un usuario administrador(En produccion) preconfigurado en la base de datos con las siguientes credenciales:

```json
{
  "username": "admin",
  "email": "admin@gmail.com",
  "password": "Admin1234!"
}
```

Este usuario puede ser utilizado para pruebas iniciales.

## Estructura del Proyecto
### Módulos Clave
- **Usuarios (User)**: Gestión de usuarios, autenticación y autorización.
- **Propiedades (Property)**: Administración de información relacionada con propiedades inmobiliarias.
- **Listados (Listing)**: Gestión de las propiedades disponibles para compra/venta.
- **Transacciones (Transaction)**: Registro de las operaciones financieras relacionadas con las propiedades.

## Desafíos y Soluciones
1. **Configuración de Relaciones Complejas en TypeORM**
    - Desafío: Gestionar relaciones bidireccionales y definir estrategias de carga.
    - Solución: Se priorizó un diseño modular y consultas eficientes para reducir la carga innecesaria en memoria.

2. **Implementación de Autenticación y Seguridad**
    - Desafío: Proteger rutas sensibles y manejar la validación de usuarios.
    - Solución:
        - Uso de JWT para autenticar usuarios.
        - Middleware de NestJS para verificar tokens en rutas protegidas.

3. **Despliegue en Entornos Contenerizados**
    - Desafío: Configurar un entorno Docker funcional para NestJS y PostgreSQL.
    - Solución: Diseño de un `docker-compose.yml` simplificado para asegurar consistencia entre entornos. En el caso de computadoras con chips M1/M2/M3, la librería `bcrypt` se reemplazó por `bcryptjs` para garantizar la compatibilidad.

4. **Manejo de Datos a Gran Escala**
    - Desafío: Optimizar consultas en tablas con datos extensos.
    - Solución: Implementación de índices en columnas clave y uso de funciones avanzadas de PostgreSQL para optimizar el rendimiento.

5. **Respuestas Adaptativas**
    - Desafío: Diseñar valores de respuesta lo más adaptativos posibles para facilitar la integración con el frontend y la creación de dashboards.
    - Solución: Estructuración clara y detallada de las respuestas para que sean fáciles de consumir por desarrolladores frontend.

6. **Diseño de Endpoints y Relaciones**
    - Desafío: Definir los endpoints necesarios considerando las relaciones entre las entidades.
    - Solución: Priorización de endpoints clave con un enfoque en simplicidad y funcionalidad inmediata.

## Decisiones Técnicas
1. **Elección de TypeORM**
    - Pros: Integración fluida con NestJS y facil implementacion con migraciones.

2. **Arquitectura Modular**
    - Cada recurso (User, Transaction, Listing, Property) está encapsulado en un módulo, lo que mejora la mantenibilidad y escalabilidad.
