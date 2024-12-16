# Backend Challenge - Mid-Level

## Instalación

1. npm install

2. Opcional. En caso de querer utilizar una base de datos local ejecutar el comando 'npm run build' para traspilar y 'npm run migration:run' para realizar la migración inicial.

## RESUMEN

La API utiliza el patron MVCs, con repositorios para poder encapsular y separar la lógica de las transacciones con la base de datos de la lógica de negocio.
Establece un sistema de roles el cual ofrece la posibilidad de limitar el acceso a ciertos recursos, siendo el rol básico de un usuario logueado (0) el que se crea por defecto al crear un usuario, y un usuario administrador (1) con posibilidades de acceso a informes estadísticos, entre otras cosas.
(Datos del usuario administrador: email: admin@prueba.com password: Prueba123!).

La misma cuenta con un sistema avanzado de filtros (más ejemplos en la documentación) que permite filtrar por varios campos mayores, menores, iguales al indicado por parametro.
Se puede fitrar tanto por datos de la entidad solicitada, como de las entidades relacionadas a la misma.

También cuenta con un sistema de paginación modificable limitada a 50 registros.

Se agregaron varios tipos de informes estadísticos propuestos en el ejercicio. Únicamente el usuario administrador tiene acceso.

## CASOS DE USO

Supongamos que queremos obtener todos las anuncios. Sería tan fácil como hacer una solicitud de tipo GET a /advertisements.
En caso de querer filtrar por determinados precios podríamos realizar la misma solicitud, agregándole como query param ?price[gte]=2000.
Si quisieramos además solicitar información de la propiedad vinculada, podríamos agregarle?property.area[lt]=1000

Los operadores disponibles son:

- gt: ">",
- lt: "<",
- gte: ">=",
- lte: "<=",
- eq: "=",
- ne: "!=",

Los campos disponibles para filtrar son:

Propiedades:

- area (con filtro de operadores)
- address, sector (búsqueda sin operadores)
- advertisements (para que me traiga los anuncios relacionados o aplicarles filtros a los mismos deberemos activar la relacion pasandole advertisement=true):

  - id y price (con filtro de operadores)

Anuncios:

- price (con filtro de operadores)
- status y type (búsqueda sin operadores)
- property:
  - area (con filtro de operadores)

Transacciones:

- price y date (con filtro de operadores)
- type (búsqueda sin operadores)
- property:
  - area (con filtro de operadores)

## LINKS

Documentación ==> https://documenter.getpostman.com/view/26489502/2sAYHzG2z4
Deploy ==> https://backend-challenge-70q2lo05f-tomas-projects-3db80bcd.vercel.app
