# Instalación del Proyecto API con Entity Framework en C#

Este archivo proporciona una guía paso a paso para configurar y ejecutar el proyecto de la API utilizando Entity Framework y C# mediante comandos `dotnet`.

## Requisitos Previos

- [.NET Core SDK](https://dotnet.microsoft.com/download) instalado en tu sistema.
- Conexión a Internet para instalar paquetes y dependencias.

## Pasos de Instalación

1. **Crear un Nuevo Proyecto:**
   Crea un nuevo proyecto API utilizando el comando `dotnet new` con la plantilla `webapi`.
   ```bash
   dotnet new webapi -o ProyectoAPI
   ```

2. **Agregar Entity Framework:**
   Agrega Entity Framework Core al proyecto utilizando el comando `dotnet add package`.
   ```bash
   cd ProyectoAPI
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Design
   ```

3. **Agregar Herramientas EF:**
   Agrega las herramientas de Entity Framework Core al proyecto para ejecutar migraciones.
   ```bash
   dotnet tool install --global dotnet-ef
   dotnet add package Microsoft.EntityFrameworkCore
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Microsoft.EntityFrameworkCore.Relational
   dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
   dotnet add package Microsoft.EntityFrameworkCore.Tools

   dotnet add package Microsoft.aspnetcore.mvc.Newtonsoftjson # Per evitar errors de serialització (circular reference)
   dotnet add package Microsoft.EntityFrameworkCore.Proxies # En principi no cal

   dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design 
   dotnet add package Microsoft.EntityFrameworkCore.Design 
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer 
   dotnet tool uninstall -g dotnet-aspnet-codegenerator
   dotnet tool install -g dotnet-aspnet-codegenerator
   dotnet tool update -g dotnet-aspnet-codegenerator
   dotnet add package MongoDB.Driver.EntityFrameworkCore
   dotnet add package MongoDB.Driver

   dotnet add package Swashbuckle.AspNetCore --version 6.4.0
   ```

4. **Crear el Contexto de Datos:**
   Crea una clase para el contexto de datos que herede de `DbContext`.
   ```csharp
   // Data/DataContext.cs
   using Microsoft.EntityFrameworkCore;
   
   namespace ProyectoAPI.Data
   {
       public class DataContext : DbContext
       {
           public DataContext(DbContextOptions<DataContext> options) : base(options)
           {
           }

           // DbSet para cada entidad
           public DbSet<Employee> Employees { get; set; }
           public DbSet<Department> Departments { get; set; }
           public DbSet<Project> Projects { get; set; }
           public DbSet<Dependent> Dependents { get; set; }
       }
   }
   ```

5. **Crear Modelos de Entidades:**
   Crea una clase para cada modelo de entidad que refleje la estructura de la base de datos.
   ```csharp
   // Models/Employee.cs
   namespace ProyectoAPI.Models
   {
       public class Employee
       {
           // Propiedades de la entidad Employee
       }
   }
   ```

6. **Agregar Migraciones:**
   Genera las migraciones iniciales para crear las tablas en la base de datos.
   ```bash
   dotnet ef migrations add InitialCreate
   ```

7. **Actualizar la Base de Datos:**
   Aplica las migraciones para crear la base de datos.
   ```bash
   dotnet ef database update
   ```

8. **Genera el controlador**:
   Utiliza la herramienta de generación de código para crear un controlador para tu modelo de datos. Por ejemplo, si tienes un modelo llamado `Employee`, puedes generar un controlador CRUD utilizando el siguiente comando:

   ```
   dotnet aspnet-codegenerator controller -name EmployeesController -async -api -m Employee -dc DataContext -outDir Controllers
   ```

   - `-name EmployeesController`: Especifica el nombre del controlador a generar.
   - `-async`: Genera acciones asincrónicas en el controlador.
   - `-api`: Genera un controlador de API web.
   - `-m Employee`: Especifica el nombre del modelo que utilizará el controlador.
   - `-dc DataContext`: Especifica el nombre del contexto de datos que utilizará el controlador.
   - `-outDir Controllers`: Especifica el directorio donde se generará el controlador. En este caso, se generará en el directorio "Controllers".

   Asegúrate de reemplazar `Employee` y `DataContext` con los nombres de tu modelo y contexto de datos, respectivamente.

9. **Repite el proceso para otros modelos (si es necesario)**:
   Si tienes más modelos en tu proyecto y deseas generar controladores para ellos, repite el paso 2 para cada uno de los modelos.

Después de ejecutar estos pasos, se generarán automáticamente controladores en tu proyecto que implementan las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para tus modelos de datos. Estos controladores estarán en el directorio especificado (`Controllers` en este caso) y estarán listos para ser utilizados en tu aplicación ASP.NET Core.

10. **Ejecutar el Proyecto:**
   Una vez completados los pasos anteriores, puedes ejecutar el proyecto utilizando el siguiente comando.
   ```bash
   dotnet run
   ```

¡Listo! Ahora tienes instalado y ejecutándose el proyecto de la API con Entity Framework en tu máquina local utilizando comandos `dotnet`. Si tienes alguna pregunta o problema durante la instalación, no dudes en consultar la documentación oficial de .NET Core o Entity Framework, o contactar conmigo para obtener ayuda adicional. ¡Disfruta desarrollando tu proyecto!