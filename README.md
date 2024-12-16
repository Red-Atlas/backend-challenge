# Backend Challenge - Mid-Level

## Descripción

El objetivo de este desafío es construir una API para gestionar información catastral e inmobiliaria. Evaluaremos tu habilidad para manejar grandes volúmenes de datos, diseñar estructuras eficientes y aplicar buenas prácticas de desarrollo backend.

## Requisitos Técnicos

- **Lenguaje**: Node.js + TypeScript
- **Framework**: Express
- **Base de Datos**: PostgreSQL 
- **ORM**: TypeORM (usando migraciones)
- **Autenticación**: JWT

## Requisitos del Proyecto

1. **Endpoints CRUD** para las siguientes entidades, por ejemplo:
   - **Propiedades**:
     - `address`
     - `area`
     - `ownerName`
     - `sector` (`residential`, `commercial`, `industrial`, `agricultural`)
   - **Anuncios** asociados a Propiedades:
     - `price`
     - `status` (`for_sale`, `for_lease`)
     - `propertyType` (`apartment`, `house`, `retail`, `land`, `industrial`)
   - **Transactions** asociadas a Propiedades:
     - `address`
     - `type` (`sale_purchase`, `lease`, `mortgage`, `judicial sale`, `other`)
     - `date`
     - `price`
2. **Autenticación y Autorización**:
   - Implementar autenticación con JWT.
   - Roles (`user`, `admin`) para restringir acceso a ciertos endpoints.

3. **Consultas Complejas**:

   - **Filtros Avanzados 🔎**
     - Listar propiedades aplicando filtros múltiples utilizando todas las entidades relacionables.
     - Aplicar ordenamiento y paginación.

   - **Integración de Carga Pesada 🚛**  
     En esta tarea, deberás demostrar tu capacidad para manejar grandes volúmenes de datos y calcular dinámicamente valores adicionales para enriquecer la información presentada en los endpoints.

     - **Requerimiento**:  
       Lista todas las parcelas y calcula dinámicamente un campo adicional como `valuation`. Este valor debe ser generado en base a una fórmula que definas según las propiedades de las parcelas (por ejemplo, `valuation = area * property price`).  

     - **Ejemplo de Fórmula**:  
       ```text
       valuation = area (en m²) * precio promedio por m² (basado en propiedades del mismo sector)
       ```

     - **Objetivo**:  
       Optimizar la generación de este campo para que la consulta pueda manejar eficientemente un gran número de registros.

     - **Tips para Implementación**:
       - Considera usar una consulta SQL con `JOIN` y agregaciones para calcular el `valuation` directamente desde la base de datos.
       - Si usas cálculos en el backend, asegúrate de que estén optimizados y no ralenticen las respuestas.
       - Piensa en cómo podrías manejar este cálculo para un gran volumen de datos sin afectar el rendimiento.

## Extras Opcionales 🌟
- **OAuth 2.0**.
- **Docker Compose**.
- **Pruebas unitarias**.
- **Consultas Complejas:**
  - **Geográficas (Altamente Valorado)🌍**  
     Esta funcionalidad es opcional, pero implementarla mostrará tu capacidad para manejar cálculos espaciales y datos geográficos, algo que valoraremos enormemente. Si decides implementarlo, sumarás puntos extra en tu evaluación. 🚀

     Puedes simular coordenadas geográficas para las Propiedades/Anuncios, almacenándolas en la base de datos y utilizando una librería como [PostGIS](https://postgis.net/) para realizar cálculos espaciales. Aquí tienes algunas ideas interesantes:  
     - **Filtrado por Radio 🧭**: Filtra propiedades dentro de un radio de X kilómetros de una ubicación específica.  
     - **Orden por Proximidad 📍**: Ordena propiedades según su cercanía a un punto de referencia.  
     - **Cálculo de Áreas 🌐**: Calcula las áreas totales de propiedades en un sector o región.

     💡 **Consejo**: Si no estás familiarizado con cálculos espaciales, PostGIS es un excelente punto de partida. ¡Inténtalo! 🎉

   - **Análisis de Datos (un gran plus)📊**  
     Esta funcionalidad no es obligatoria, pero destacará tu capacidad técnica y será un diferencial importante en la evaluación. Es ideal para demostrar habilidades en análisis y generación de datos útiles para dashboards. 🚀

     En esta sección, deberás generar información que permita representar datos relevantes en gráficos y/o dashboards. Algunas ideas que puedes implementar:

     - **Distribución por Sector 🏙️**  
       Agrupa y cuenta las propiedades o anuncios según su sector (`residential`, `commercial`, etc.) y proporciona datos listos para gráficos de barras o tortas.

     - **Tipos de Propiedades 🏡**  
       Genera estadísticas sobre la cantidad de propiedades por tipo (`apartment`, `house`, etc.). ¡Perfecto para gráficos de pastel o barras apiladas!

     - **Tendencias en el Tiempo 📅**  
       Analiza las transacciones por fecha (`sale_purchase`, `lease`) y agrúpalas por meses o años. Esto es ideal para gráficos de líneas o áreas, mostrando tendencias en precios o actividad del mercado.

     - **Rangos de Precios 💰**  
       Divide los anuncios o propiedades en rangos de precios (por ejemplo, `0-50k`, `50k-100k`, etc.) y calcula cuántos anuncios están en cada rango. ¡Ideal para histogramas!

     - **Sectores más Caros 🔝**  
       Calcula el precio promedio por sector o tipo de propiedad para destacar las zonas o tipos de mayor valor.

     💡 **Implementación sugerida**: Utiliza funciones avanzadas de PostgreSQL como `GROUP BY` y `AVG` o librerías específicas para análisis en tu backend.

## Requisito Adicional: **Despliegue** 🌐🚀

Es indispensable que el proyecto esté **desplegado** en un servicio gratuito para poder testearlo directamente. Esto asegura que el evaluador pueda interactuar con tu API en un entorno real.

### **Pasos sugeridos para el despliegue**:
1. **Configura tu proyecto**:  
   Asegúrate de que pueda ejecutarse en un entorno en la nube. Utiliza variables de entorno para manejar configuraciones sensibles. ⚙️  
2. **Base de Datos**:  
   Crea una base de datos PostgreSQL gratuita utilizando servicios como [**Neon**](https://neon.tech/) o [**ElephantSQL**](https://www.elephantsql.com/). 🐘  
3. **Despliega tu proyecto**:  
   - [**Guía para Vercel**](https://vercel.com/docs/concepts/projects/overview) 🌐 
4. **Proporciona el enlace al proyecto desplegado** en el README de tu fork. ¡Asegúrate de que esté funcional y accesible! 🌟  

## Instrucciones de Entrega

- Realiza un fork de este repositorio: [Red-Atlas/backend-challenge](https://github.com/Red-Atlas/backend-challenge).
- Crea un branch con tu nombre completo en el formato: nombre-apellido.
- Sube tu código al branch correspondiente.
- Desplegar la aplicación en un servicio gratuito como **Vercel**.

- Incluye en el README del fork:
  - Instrucciones en el `README.md` para instalar y ejecutar la aplicación.
  - El enlace al proyecto desplegado.
  - Un resumen de tu solución (enfoque, desafíos, decisiones técnicas).
  - Realiza un pull request a este repositorio.

### Criterios de Evaluación
- Diseño de la base de datos y relaciones entre entidades.
- Eficiencia y optimización en las consultas.
- Buenas prácticas: modularidad, estructura del proyecto y manejo de errores.
- Implementación de validaciones y seguridad.
- Extras implementados.
- **Despliegue funcional y accesible**.

---

### 🚀 ¡Buena suerte!


### Eduardo Sequeira Comments

Despliegue: https://node-backend-challenge.onrender.com/

"Todos las rutas alternativas tienen /api"

(El servicio de render por ser un plan free el despliegue, a los 15 minutos de no tener consultas detiene los servicios, al realizar la primera consulta puede demorar un poco ya que reinicia el proyecto, tomar en consideracion)

### Ejecucion de proyecto
- Realizar npm install, y ejecutar **npm run dev** ya realiza el build, (preferible ejecutar **npm run build** primero)
- Generar migraciones BD, ejecutar **npm run m:gen src/migrations/"nameOfMigration"**
- Ejecutar migraciones hacia la BD, ejecutar **m:run**
- Testing, ejecutar **npm run test**

### Introduccion
-El objetivo del challenge fue desarrollar una aplicacion backend donde los endpoints debian ser funcional, eficiente y capaz de manejar gran cantidad de datos

### Enfoque
- Enfoqué mi desarrollo en lograr una arquitectura modular, con el objetivo de garantizar componentes altamente reutilizables y un proyecto más organizado. Para ello, implementé un esquema en el que cada módulo (por ejemplo, usuarios, propiedades, etc.) tiene su propia carpeta, dentro de la cual se encuentra toda la lógica relacionada, como controladores, servicios, entidades, y utilidades. Este enfoque evita la dispersión de archivos en el proyecto y facilita la navegación y el mantenimiento del código.

- prioricé la implementación de funcionalidades esenciales desde el principio. Para consultas complejas a la base de datos, opté por escribirlas directamente en SQL, lo que permitió maximizar la eficiencia en términos de rendimiento y tiempo de ejecución.

### Desafíos encontrados
- Trabajar con Postgis fue un desafio ya que nunca lo habia implementado, fue interesante poder manejar la herramienta y conocer todo lo que puede hacer con Postgres.

- Tuve un percance con el deploy con Vercel, no me estaba tomando la base de datos de Postgres y al realizar un llamado a algun query me daba error que no encontraba la entidad, pienso que podria ser por algun tema de configuracion ya que obligaba a tener el proyecto en la carpeta /api al hacer el deploy.

### Decisiones tecnicas
- El diagrama de la BD, se realizo con las entidades indicadas, y las relaciones se indican en este diagrama para mejor visualizacion: https://dbdiagram.io/d/backend-challenge-66344da25b24a634d06407d2
- En el query de valuation, se realizo con solo SQL para maximizar el rendimiento de la consulta, se realizo un paginado para aun mas mayor rendimiento y sin relaciones.
- Se modularizaron todos las funciones principales de los diferentes modulos en los .services
- Se implemento la propiedad de "active" en todos los modelos para implementar un soft delete (borrado logico) ya que es de buena practica no eliminar cosas importantes de la BD. En todos los findOne se buscan los modelos con filtro { active: true } por si se decide implementar el borrado logico.
- Google Auth con OAuth, me parecio interesante implementar google auth como servicio para el sign-up y sign-in y adjuntarlo con el JWT (El response de el google auth devolvera el login token jwt en el url query)
- El despliegue se realizo con la imagen de docker creada, El servicio de despliegue fue: Render