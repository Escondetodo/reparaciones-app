# Especificación de Reparaciones

## Propósito

Dominio de la entidad reparación: persistencia en Postgres con RLS,
generación automática de `ticket_code` legible (`ORD-XXXXXXXX`),
consulta pública anónima vía RPC con `SECURITY DEFINER`,
y CRUD privado para propietarios autenticados.

## Requisitos

### Requisito: Persistencia con RLS

Toda reparación DEBE pertenecer a un usuario (`owner_id` references auth.users).
RLS DEBE filtrar para que cada usuario autenticado vea/edite solo sus reparaciones.
Anónimos NO DEBEN acceder a la tabla directamente.

#### Escenario: Listado propio

- DADO un usuario autenticado con repairs en la BD
- CUANDO ejecuta `select` sobre `repairs`
- ENTONCES solo recibe filas con `owner_id = auth.uid()`

#### Escenario: Anónimo bloqueado

- DADO un usuario no autenticado
- CUANDO intenta `select` sobre `repairs`
- ENTONCES recibe error 42501

### Requisito: Generación de ticket_code

Cada reparación DEBE tener un `ticket_code` único (`ORD-XXXXXXXX`, 8 chars mayúscula)
generado automáticamente por un trigger `BEFORE INSERT`.
El trigger DEBE reintentar hasta 5 veces ante colisiones y fallar si se agotan.

#### Escenario: Ticket asignado en creación

- DADO que se inserta una reparación sin `ticket_code`
- CUANDO el trigger se ejecuta
- ENTONCES se asigna un `ticket_code` formato `ORD-XXXXXXXX`

#### Escenario: Colisión con reintento

- DADO que el trigger genera un código existente
- CUANDO ocurre `unique_violation`
- ENTONCES reintenta hasta 5 veces

### Requisito: Consulta pública por ticket

El sistema DEBE exponer `get_repair_by_ticket` con `SECURITY DEFINER`
para consulta anónima. DEBE ser case-insensitive.
Si no existe, DEBE devolver cero filas sin error.

#### Escenario: Consulta anónima exitosa

- DADO una reparación con `ticket_code = 'ORD-ABC12345'`
- CUANDO un anónimo llama `get_repair_by_ticket('ord-abc12345')`
- ENTONCES recibe la reparación (case-insensitive)

#### Escenario: Ticket inexistente

- DADO que no existe esa reparación
- CUANDO se llama `get_repair_by_ticket('ORD-NOEXISTE')`
- ENTONCES se devuelven cero filas

### Requisito: CRUD de propietario

Usuarios autenticados DEBEN crear, leer, actualizar y eliminar sus reparaciones.
El `owner_id` DEBE asignarse desde la sesión automáticamente.
Sin sesión activa, DEBE fallar con error traducido.

#### Escenario: Creación con sesión

- DADO un usuario autenticado
- CUANDO crea una reparación
- ENTONCES `owner_id` se asigna automáticamente y la operación es exitosa

#### Escenario: Creación sin sesión

- DADO que no hay sesión activa
- CUANDO se intenta crear
- ENTONCES el sistema lanza error traducido

### Requisito: Traducción de errores

El sistema DEBE traducir estos códigos a español: `42501` (RLS),
`23505` (unique), `PGRST116` (no rows), `23503` (FK).
Códigos no mapeados DEBEN usar mensaje genérico.

#### Escenario: RLS denegado

- DADO un usuario sin permisos sobre una reparación ajena
- CUANDO Postgres devuelve 42501
- ENTONCES el mensaje dice "No tenés permiso para acceder a esta reparación"

#### Escenario: Unique violation

- DADO un conflicto de `ticket_code`
- CUANDO Postgres devuelve 23505
- ENTONCES el mensaje indica que el código de ticket ya existe

### Requisito: Validación de estado

El estado DEBE ser `analisis`, `proceso` o `finalizado`.
La BD DEBE rechazar otros valores con constraint CHECK.

#### Escenario: Estado válido

- DADO una reparación con `estado = 'proceso'`
- CUANDO se inserta o actualiza
- ENTONCES la operación es exitosa

#### Escenario: Estado inválido

- DADO una reparación con `estado = 'cancelado'`
- CUANDO se inserta o actualiza
- ENTONCES la BD rechaza la operación
