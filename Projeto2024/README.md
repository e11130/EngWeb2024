***RELATORIO***
Proyecto Engenharia Web.

Alumnos:
Dario Prieto Soria e11130
Hugo Revuelta Aja e11134

RELATORIO:
Introducción:
En este proyecto se pretende desarrollar una aplicación web que sirva como Gestor de Unidades Curriculares (asignaturas) de manera que esta pueda cumplir sus funcionalidades de la manera más eficiente, segura y robusta posible. Las funcionalidades de esta app son:
    -La aplicacion debe tener un servicio de autenticacion. Todo usuario deberá iniciar sesión (o registrarse en caso de no tener cuenta) para poder realizar cualquier tarea.
    -Posibilidad de exportar informacion de las ucs. Todos los usuarios que hayan sido registrados en esas UCs y tengan el nivel de docente/ administrador podrán descargar la información que haya sido subida a la pagina de esa UC.
    -Posibilidad de exportar informacion de las ucs. Todos los usuarios que hayan sido registrados en esas UCs podrán descargar la información que haya sido subida a la pagina de esa UC.
Como se ha mencionado antes, una de las propiedades de los usuarios es el nivel, en la aplicación se distinguen tres niveles de usuarios y cada uno puede hacer distintas acciones:
    -Aluno: es el nivel más bajo, puede acceder a su información personal y editarla y a la informacion de las UCs en las que está registrado (también puede descargar el contenido de ellas)
    -Docente: es el nivel medio, aumenta las funcionalidades del anterior. Además, éste puede editar informacion de las ucs en las que está registrado (subir archivos,añadir docentes, aulas, horarios...)
    -Administrador: es el nivel más alto, tiene acceso a todas las operaciones. Sus funcionalidades incluyen añadir nuevas UCs, eliminar las ya existentes, editarlas, además de poder ver la información de todos los usuarios.

BASE DE DATOS Y JSON
Los datos se guardan en una base de datos y en archivos json.
-Los datos de los usuarios y las UCs son guardados en una base de datos de mongoDB. La conexión se realiza usando 'mongoose' 
-Los datos relativos a los archivos que se suben a cada UC se guardan en ficheros json en la carpeta "data".

Las primeras UCs que fueron dadas como ejemplo se copiaron al contenedor de la asignatura de Docker y luego se importaron a la base de datos "projeto" en la colección "uc" que guarda todas las asignaturas.

MANUAL DE LA APLICACIÓN Y EXPLICACIONES
1.  Para poder utilizar correctamente la aplicación, el primer paso que tienen que realizar todos los usuarios es la autenticación: 
Si no está registrado, le dará al botón de registrar y tendrá que rellenar un formulario que
incluye nombre de usuario, password, nombre, nivel de usuario, asignaturas en las que se registra.      
Si ya lo está, pulsará el boton de login y rellenará su nombre de usuario y la contraseña, si las credenciales no coinciden o no hay ningun usuario con ese nombre registrado saltará un error.
En caso de que todo vaya bien, se renderizará la página personal de ese usuario.
En ambos casos (login/register) se genera un token de autenticación que se guarda en la
cookie "auth-token". De esta forma, podremos restringir el acceso a distintas operaciones en el resto de rutas.
2.  Una vez se ha autenticado, en la pagina de usuario aparece su información y varias acciones posibles para realizar:
    -Posibilidad de editar la información personal:
    -Acceso a la información de las UCs en las que aparece registrado.
    -Posibilidad de editar la información de la UC en la que está registrado. Esta acción está restringida solo para docentes/admin.

    Explicación: para restringir el acceso a las distintas acciones de la aplicación se hace uso de la funcion "verificaacceso" de "auth/auth". Esta función verifica el token y la información del payload (en la que se incluye el nombre de usuario y el nivel) y comprueba que el nivel coincida con el que se le ha pasado como parametro. Si el usuario no tiene el nivel requerido saltará el error "Permissões insuficientes".

3.  Si tiene el nivel de docente/admin podrá editar la información de sus UCs: nombre, titulo, docentes, aulas, horarios, avaliacoes... además de poder subir y eliminar archivos a la página de esa UC.
Al editar la informacion de la Ucs, tienes tanto la opcion de editar informacion, ademas tambien se puede añadir datos, como nuevos docentes, nuevas avaliacoes y nuevas aulas, y por ultimo tambien se podria eliminiar tantos docentes como availacoes como aulas, de cada uc correspondiente.
Si simplemente quiere consultar la información de la UC (acción que puede realizar cualquier usuario) podrá ver toda la información que contiene y podrá descargar los archivos que se hayan subido.
    Explicación: Para poder descargar y consultar el contenido de los archivos se hizo uso de la funcion "showImage" de "public/javascripts/fileManager". A esta función se le pasa el nombre del archivo y el mimetype y al pulsar en el archivo aparecerá un modal que mostrará el nombre del archivo (si es una imagen también se podrá ver la imagen) y nos dará la posibilidad de descargar el archivo o de simplemente cerrar el modal
    Para subir los archivos se utiliza las funciones de la libreria "FileSystem" y "Upload", se cambia la ruta antigua por la nueva y se añade la información del archivo al JSON de la asignatura correspondiente.
4.  Si tiene el nivel de administrador, podrá acceder a la lista de todas las ucs y de todos los usuarios: 
    -En la lista de usuarios se mostrará en una tabla información personal de este y se le ofrecerá la opción de poder borrar estos usuarios.
    -En la lista de UCs tendrá las opciones de añadir una nueva UC, para lo cual tendrá que rellenar un form con toda la información respectiva a esa UC. Tambien podrá editar todas las UCs o borrar las ya existentes.

ERRORES Y POSIBLES MEJORAS

A lo largo del desarrollo de este proyecto, hemos tenido bastantes problemas en distintos aspectos, algunos de ellos se han podido solventar y otros no:
    -Una de las funciones básicas de la aplicación es la de poder editar la UC al completo. No se ha podido completar esta función ya que la propiedad Horarios no solo no se consigue editar, si no que ademas se edite lo que se edite al hacer el post se borran los horarios y se quedan vacíos. Creemos que este problema se debe a que el paso de la informacion de la view a la ruta se hace de manera incorrecta.

    -Otra de las cosas que se intentó llevar a cabo era comprobar con el payload del token en las rutas con información exclusiva de un usuario que el username del payload era igual que el de la ruta. Creamos otra función en la carpeta Auth para intentar conseguir esto pero optamos por no incluirlo en la versión final porque daba problemas.

