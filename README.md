#  MYMUSIC

## Índice

* [1. Definición de producto](#1-Definición-de-producto)
* [2. Historias de usuario ](#2-Historias-de-usuario)
* [3. Prototipos](#3-Prototipos)
* [4. Implementación](#4-Implementación)
## 1. Definición de producto 

MyMusic es una red social para todos los amantes de la música, aquí podrán compartir sus pensamientos e indicar sus gustos musicales mediante publicaciones, las cuales se podrán editar o eliminar. Los usuarios pueden  interactuar con las publicaciones de otros con likes y visualizarán la cantidad de likes. Si son nuevos usuarios, se pueden registrar de dos formas, con un correo electrónico o bien, con una cuenta de Google.

![Alt text](image.png)

## 2. Historias de usuario
  ### - Historia 1:

  Yo como usuario de esta red social :
  Deseo poder ingresar con un usuario/correo y una contraseña, de lo contrario poder registrar mis datos y crear una cuenta. 

  Para : acceder y participar en ella.
 
 Teniendo en cuenta estos requerimientos obtuvimos los siguientes **Criterios de aceptación** :

   * Tener dos campos, uno para ingresar el usuario/correo y otro para la contraseña.

   * Si no tengo una cuenta, poder crear una con correo o con mi cuenta de Google.
 
 Y la siguiente **Definición de terminado** :

* Estructurar el formulario de ingreso, añadiendo dos campos para los datos y un botón para consultarlos en la base de datos.
* Desarrollar las validaciones en JS para el ingreso, como que los campos no estén vacíos, que la contraseña o correo sean incorrectos, que uno de los campos esté vacío o que la cuenta ingresada no existe.
* Estructurar el formulario de registro, añadiendo los campos necesarios (...) para hacer el registro en la BD
* Desarrollar las validaciones en JS para el registro, como que se proporcione un correo con un formato válido, cantidad y tipo de caracteres para la contraseña, que la cuenta ya esté registrada.
* Desarrollar las pruebas unitarias para todas las validaciones especificadas anteriormente. 
* Utilizar localStorage(), para almacenar el usuario y contraseña para la persistencia de datos.
* Desarrollar el modelo entidad-relación de la BD.
* Mostrar el nombre del usuario que ah iniciado sesion.

 ### -Historia 2:

  Yo como usuario :
  Quiero tener un cuadro de texto y un botón.
  Para: crear una publicación y verla en mi muro.

  ### -Historia 3:

  Yo como usuario:
  Quiero tener una opción de edición.

  Para: editar la publicación que desee.

  ### -Historia 4:
  
  Yo como usuario: 
  Quiero tener una opción de eliminar.

  Para: eliminar la publicación que seleccione.


  ### -Historia 5:

  Yo como usuario: 
  Quiero ver una sección de likes.
  Para: poder indicar qué publicaciones me gustan y ver a quienes les gusta esa publicación. 




## 3. Prototipos


## 4. Implementación

