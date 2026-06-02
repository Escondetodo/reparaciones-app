-- 0002_repairs_seed.sql
-- Seed de reparaciones existentes desde json-server
-- owner_id seteado al UUID del admin local

insert into public.repairs (owner_id, nombreCliente, apellidoCliente, telefonoCliente, emailCliente, nombreProducto, marcaModelo, estado, precioPresupuestado, problemaReportado, observacionesTecnicas, fechaIngreso) values

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lorena', 'Input', '11454545454', 'lorena@gmail.com', 'celular', 'Motorola g32', 'finalizado', 300000, 'no anda', 'Sin observaciones', '2024-01-15T10:00:00Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Carlos', 'López', '+54 11 5555-1234', 'carlos.lopez@email.com', 'MacBook Pro', 'Apple MacBook Pro 13 2020', 'finalizado', 25000, 'Teclado no responde algunas teclas', 'Teclado reemplazado. Limpieza profunda realizada', '2024-01-18T09:15:00'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Ana', 'Martínez', '+54 11 7777-8845', 'ana.martinez@email.com', 'iPad Air', 'Apple iPad Air 4ta Gen', 'analisis', 12000, 'Pantalla táctil no responde en una zona', '', '2024-01-22T11:00:00'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Roberto', 'Sánchez', '+54 11 3333-4444', 'roberto.sanchez@email.com', 'PlayStation 5', 'Sony PlayStation 5', 'proceso', 18000, 'No lee discos', 'Unidad óptica con falla mecánica', '2024-01-25T15:30:00'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Pedro', 'Gómez', '+54 11 2222-3333', 'pedro@test.com', 'iPhone 14', 'Apple iPhone 14 Pro', 'analisis', 18000, 'Camara no enfoca', '', '2024-01-30T19:00:00'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Gaston', 'Perez', '45454545', 'prueba@gmail.com', 'notbook', 'samsung', 'analisis', 23232323, 'No funciona la memoria ram', 'prueba de notbook prueba', '2026-02-11T20:33:58.013Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Juan Leonardo', 'Poggi', '+54 11 1234-5674', 'juanleonardo.22@email.com', 'Tablet', 'Xiaomi', 'analisis', 300, 'No carga, el pin esta roto', '', '2026-03-19T02:28:51.124Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Melody', 'Abregu', '232cscss2424', 'melo@gmail.com', 'Celular', 'Xiaomi 12', 'analisis', 5678, 'No anda el pin de carga', '', '2026-03-19T02:28:51.768Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Diego', 'Iglesias', '2233435353cscscs', 'diegop@gmail.com', 'Tablet', 'Xiamomi', 'analisis', 300000, 'No anda nada', '', '2026-03-19T20:50:21.638Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Daniel', 'Perrone', '323232323', 'daniel@gmail.com', 'Celular', 'Ipone', 'analisis', 222, 'No funciona la pantalla', '', '2026-03-19T20:50:22.891Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Luis', 'Nosabe', '111212112', 'luis@email.com', 'celular', 'Motorola', 'proceso', 3000, 'No anda pantalla', '', '2026-03-27T18:19:55.871Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Antonio', 'Conde', '11454545454', 'antonio@gmail.com', 'Tablet', 'Xiamoi', 'analisis', 12233, 'No prende la pantalla', 'Vino todo golpeado', '2026-04-15T16:41:14.892Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lorena', 'Pérez', '11454545454', 'lorena@gmail.com', 'celular', 'samsung', 'analisis', 1212121212, 'sasasas', 'sasasasasa', '2026-04-30T16:47:12.034Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lucas', 'Mellera', '11454545454', 'juan.perez@email.com', 'tablet', 'samsung', 'analisis', 2121212, 'no anda pantalla', 'vino sin cargador', '2026-04-30T17:38:49.123Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Juan', 'Nosabe', '11454545454', 'juan.perez@email.com', 'ade', 'addad', 'analisis', 3323, 'asdad', 'sadadsad', '2026-04-30T17:40:06.094Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Damian', 'Nosabe', '+54 11 1234-5674', 'juanperez@gmail.com', 'celular', 'xiaomi', 'analisis', 31313, 'hhuhu', 'bbbbhbbhbhbh', '2026-04-30T17:59:26.865Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lorena', 'Pérez', '11454545454', 'juan.perez@email.com', 'ewrwr', 'rwrrw', 'analisis', 332323, 'xX', 'xsfsf', '2026-04-30T18:00:11.011Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lorena', 'sdsdsd', '11454545454', 'juan.perez@email.com', 'wwed', 'dsdsd', 'analisis', 42424242, 'adsdasd', 'sdasdasdsd', '2026-04-30T18:01:50.574Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'dasdasd', 'Pérez', '+54 11 1234-5674', 'juan.perez@email.com', 'sadad', 'dadas', 'analisis', 32323, 'rresr', 'ererer', '2026-04-30T18:04:16.368Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Damian', 'Conde', '+54 11 1234-5674', 'juan.perez@email.com', 'celular', 'ryryry', 'analisis', 242424, 'adsda', 'adasdasd', '2026-04-30T18:05:25.547Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'dad', 'dadad', '+54 11 1234-5674', 'juan.perez@email.com', 'sasdad', 'dsdas', 'analisis', 3232323, 'sdad', 'dsadsa', '2026-04-30T19:03:53.825Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lorena', 'Nosabe', '+54 11 1234-5678', 'lorena@gmail.com', 'wdww', 'dsd', 'analisis', 32323, 'c', 'dfdf', '2026-04-30T19:05:01.182Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Damian', 'asdsad', '+54 11 1234-5674', 'juan.perez@email.com', 'dad', 'sdad', 'analisis', 32323, 'yyyyyyyy', 'ujijjj', '2026-04-30T19:07:48.184Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Juan', 'dsadad', '+54 11 1234-5674', 'juan.perez@email.com', 'celular', 'rrr', 'analisis', 442424, 'adda', 'adsdda', '2026-04-30T19:09:22.464Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lorena', 'Pérez', '12122121212', 'condeda@gmail.com', 'faf', 'fasfas', 'analisis', 32323, 'qsas', 'aassa', '2026-05-04T16:30:36.828Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Juan', 'axas', '+54 11 1234-5674', 'lorena@gmail.com', '1212', '21212', 'analisis', 2121, 'ad', 'dsds', '2026-05-04T16:31:09.575Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Juan', 'yyuyuyy', '+54 11 1234-5674', 'ju@gmail.cp', 'sdas', 'dsd', 'analisis', 323, 'dsd', 'sdsd', '2026-05-04T16:34:08.216Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Damian', 'Conde', '+54 11 1234-5674', 'lorena@gmail.com', 'iPhone', 'dsds', 'analisis', 2323, 'dsds', 'sdsd', '2026-05-04T16:40:21.988Z'),

('507ecbea-502f-48e0-b3f2-97353c9ae630', 'Lorena', 'fff', '+54 11 1234-5674', 'juan.perez@email.com', 'celular', 'wewe', 'analisis', 1111, '2e2e', 'essc', '2026-05-04T16:52:15.520Z');