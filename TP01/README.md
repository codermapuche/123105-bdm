# 01 - Se cuenta con el dataset Medios que cuenta con 7000 medios nacionales. 
Se desea normalizar esta información en una Base de Datos transaccional
teniendo en cuenta que cada medio posee atributos correspondientes a su
nombre, ubicación, tipo de medio y especialidad. Migre la información del
archivo a una Base de Datos PostgreSQL con la siguiente estructura:
a. Medios(id, nombre, id_especialidad, id_tipo_medio, dirección,id_ciudad)
b. Especialidades(id, descripción)
c. Tipos_medio(id, descripción)
d. Ciudades(id, nombre, id_provincia)
e. Provincias(id, nombre)
Explique someramente la metodología utilizada y estime el tiempo que le demandó la actividad.

---

El primer paso a realizar fue convertir el archivo exel a csv, esto se realizo con mismo exel.
Luego se realizo un script (01/importar_medios.js) en node.js (ejecutar haciendo ```node importar_medios```) el cual lee el archivo linea a linea, extrae las columnas, las convierte en una serie de tuplas json que tienen la estructura solicitada y finalmente se crea el codigo de insercion SQL convirtiendo ese JSON en inserts individuales tabla por tabla, tupla por tupla y generando asi, el archivo de salida medios.sql.
Finalmente se importo el archivo dentro de postgres.
El tiempo total de trabajo fue de 1hs.
En el proceso se debieron realizar operaciones de normalizacion de string (escapado de comillas, datos multilinea, eliminacion de espacios innecesarios).

# 02 - Se cuenta con los orígenes de datos etl_cursadas, etl_estudiantes y planes con información de los estudiantes de la Universidad y sus cursadas durante el 1er Cuatrimestre 2003. 

Se solicita que genere una nueva DB con la siguiente estructura:

a. Rendimiento_Academico(id_estudiante, id_plan, id_sede, id_ciudad, id_sexo, id_cohorte, cantidad_cursadas, cantidad_aprobadas, promedio).
b. Planes(id_plan, codigo_plan, código_carrera, nombre_carrera).
c. Ciudades(id_ciudad, código_postal, nombre_ciudad, provincia).
d. Sedes(id_sede, sede).
e. Sexo(id_sexo, sexo).
f. Cohortes(id_cohortes, cohorte).

Utilice el software PDI y estime el tiempo que le demandó la actividad.

---

Utilizando la herramienta, se realizo la tarea solicitada en aproximadamente 4hs de trabajo.
Cabe destacar que al menos la mitad de ese tiempo fue invertido en pruebas, ensayos y revisiones.
Si la misma actividad tuviera que realizarse nuevamente estimo que demandaria la mitad del tiempo con 
los conocimientos actuales y la experiancia adquirida.

# 03 - Ahora, resuelva la consigna 1) con la herramienta PDI de la suite Pentaho, a través de las transformations y Jobs necesarias para llevar adelante la solución. 
Tome el tiempo que demora en resolver este ejercicio con PDI.

---

Se realizo la actividad y demoro solo 25 minutos, se destaca que no solo demoro menos tiempo el proceso
sino que tambien fue mas ameno, ya que la herramienta permite realizar operaciones que de otra forma
requieren escribir codigo manualmente.
La experiancia adquirida en el punto anterior fue fundamental para lograr este tiempo tambien, ya que si
hubiera sido el primer contacto con la herramienta hubiera demorado mucho mas sin dudas.

# 04 - Cree un Job que verifique todos los días a las 14 hs si existe el archivo 01- 01-medios.csv, trabajado en el punto 1), en un directorio determinado y en caso afirmativo ejecute el Job para actualizar la DB generada antes.

---

Este punto se desarrollo dentro de la carpeta 04.