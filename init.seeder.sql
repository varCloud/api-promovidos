INSERT INTO `db_a57e86_provdos`.`catroles` (`idRol`, `descripcion`, `activo`) VALUES (1, 'Administrador', 1);
INSERT INTO `db_a57e86_provdos`.`catroles` (`idRol`, `descripcion`, `activo`) VALUES (2, 'Capturista', 1);
INSERT INTO `db_a57e86_provdos`.`catroles` (`idRol`, `descripcion`, `activo`) VALUES (3, 'Promotor', 1);
INSERT INTO `db_a57e86_provdos`.`catroles` (`idRol`, `descripcion`, `activo`) VALUES (4, 'Promovido', 1);


INSERT INTO `db_a57e86_provdos`.`usuarios` (`idUsuario`, `usuario`, `contrasena`, `nombre`, `mail`, `telefono`, `activo`, `idRol`) VALUES (1, 'admin', 'Abcde12345', 'Admin', 'var901106@gmail.com', '4433740472', 1, 1);
INSERT INTO `db_a57e86_provdos`.`usuarios` (`idUsuario`, `usuario`, `contrasena`, `nombres`, `mail`, `telefono`, `activo`, `fechaAlta`, `idRol`) VALUES (4, 'vico@admin.com', 'Pass12345;', 'Vico', 'vico@gmail.com', ' 4437075557', NULL, '2024-02-27 22:46:48', 1);


delete from promovidos;
ALTER TABLE promovidos AUTO_INCREMENT = 1;
delete from promotores;
ALTER TABLE promotores AUTO_INCREMENT = 1;
delete from usuarios where idUsuario not in (1,4);
ALTER TABLE usuarios AUTO_INCREMENT = 5;
