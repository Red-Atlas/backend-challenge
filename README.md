# Backend Challenge - Mid-Level

## Descripción

El objetivo de este desafío es construir una API para gestionar información catastral e inmobiliaria. Evaluaremos tu habilidad para manejar grandes volúmenes de datos, diseñar estructuras eficientes y aplicar buenas prácticas de desarrollo backend.

## Requisitos Técnicos

- **Lenguaje**: Node.js + TypeScript
- **Framework**: Express
- **Base de Datos**: PostgreSQL (usando migraciones)
- **ORM**: TypeORM
- **Autenticación**: JWT

## Requisitos del Proyecto

1. **Endpoints CRUD** para las siguientes entidades:
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

   - **Filtros Avanzados**:  
     - Listar propiedades aplicando filtros múltiples utilizando todas las entidades relacionables.
     - Aplicar ordenamiento y paginación.

   - **Consultas Geográficas 🌍 (Opcional, pero Altamente Valorado)**  
     Esta funcionalidad es opcional, pero implementarla mostrará tu capacidad para manejar cálculos espaciales y datos geográficos, algo que valoraremos enormemente. Si decides implementarlo, sumarás puntos extra en tu evaluación. 🚀

     Puedes simular coordenadas geográficas para las Propiedades/Anuncios, almacenándolas en la base de datos y utilizando una librería como [PostGIS](https://postgis.net/) para realizar cálculos espaciales. Aquí tienes algunas ideas interesantes:  
     - **Filtrado por Radio 🧭**: Filtra propiedades dentro de un radio de X kilómetros de una ubicación específica.  
     - **Orden por Proximidad 📍**: Ordena propiedades según su cercanía a un punto de referencia.  
     - **Cálculo de Áreas 🌐**: Calcula las áreas totales de propiedades en un sector o región.

     💡 **Consejo**: Si no estás familiarizado con cálculos espaciales, PostGIS es un excelente punto de partida. ¡Inténtalo! 🎉

   - **Análisis de Datos 📊 (Opcional, pero un Gran Plus 💡)**  
     Esta funcionalidad no es obligatoria, pero destacará tu capacidad técnica y será un diferencial importante en la evaluación. Es ideal para demostrar habilidades en análisis y generación de datos útiles para dashboards. 🚀

     En esta sección, deberás generar información que permita representar datos relevantes en gráficos y dashboards. Algunas ideas que puedes implementar:

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
     📈 **Recuerda**: Este tipo de análisis ayuda a simular un caso de uso real, lo que puede ser un gran diferencial en tu evaluación.

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

     Este tipo de implementación simula escenarios reales de sistemas con alta demanda de procesamiento dinámico y será un plus si lo haces de forma eficiente. 🚀

## Extras Opcionales 🌟
- **OAuth 2.0**.
- **Docker Compose**.
- **Pruebas unitarias**.

## Requisito Adicional: **Despliegue** 🌐🚀

Es indispensable que el proyecto esté **desplegado** en un servicio gratuito para poder testearlo directamente. Esto asegura que el evaluador pueda interactuar con tu API en un entorno real.

### 🌟 Servicios sugeridos:
- [**Vercel**](https://vercel.com/) ✅
- [**Render**](https://render.com/) ✅
- [**Railway**](https://railway.app/) ✅

### **Pasos sugeridos para el despliegue**:
1. **Configura tu proyecto**:  
   Asegúrate de que pueda ejecutarse en un entorno en la nube. Utiliza variables de entorno para manejar configuraciones sensibles. ⚙️  
2. **Base de Datos**:  
   Crea una base de datos PostgreSQL gratuita utilizando servicios como [**Neon**](https://neon.tech/) o [**ElephantSQL**](https://www.elephantsql.com/). 🐘  
3. **Despliega tu proyecto**:  
   - [**Guía para Vercel**](https://vercel.com/docs/concepts/projects/overview) 🌐  
   - [**Guía para Render**](https://render.com/docs/deploy-nodejs-app) 🌐  
4. **Proporciona el enlace al proyecto desplegado** en el README de tu fork. ¡Asegúrate de que esté funcional y accesible! 🌟  

---

### **⚠️ Importante:**
El proyecto **no será evaluado** si no está correctamente desplegado.  
Asegúrate de probar tu API después del despliegue para confirmar que todo funciona como se espera. 🛠️

---

## Entrega y Evaluación

### Instrucciones de Entrega
1. Realiza un fork de este repositorio: [Red-Atlas/backend-challenge](https://github.com/Red-Atlas/backend-challenge).
2. Crea un branch con tu nombre completo en el formato: `nombre-apellido`.
3. Sube tu código al branch correspondiente.
4. Incluye en el README del fork:
   - El enlace al proyecto desplegado.
   - Un resumen de tu solución (enfoque, desafíos, decisiones técnicas).
5. Realiza un pull request a este repositorio.

### Criterios de Evaluación
- Diseño de la base de datos y relaciones entre entidades.
- Eficiencia y optimización en las consultas.
- Buenas prácticas: modularidad, estructura del proyecto y manejo de errores.
- Implementación de validaciones y seguridad.
- Extras implementados.
- **Despliegue funcional y accesible**.

---

### 🚀 ¡Buena suerte!

Este desafío es una oportunidad para destacar tus habilidades y trabajar con tecnologías modernas.  
¡Confía en tu talento y diviértete mientras lo haces! 🌟
