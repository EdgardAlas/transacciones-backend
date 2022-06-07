create table empleos(
	id serial primary key not null,
	empleo varchar(60) not null unique
);

create table usuarios(
	id serial primary key not null,
	nombre varchar(60) not null,
	apellido varchar(60) not null,
	correo varchar(255) not null unique,
	direccion varchar(255) not null,
	empleo_id int not null,
	CONSTRAINT fk_empleo_usuario foreign key (empleo_id) references empleos (id)
);

create table movimientos(
	id serial primary key not null,
	tipo varchar(60) not null check (tipo = 'Ingreso' or tipo = 'Retiro'),
	monto float not null check (monto > 0),
	fecha timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	usuario_id int not null,
	CONSTRAINT fk_movimiento_usuario foreign key (usuario_id) references usuarios (id)
);



create or replace view obtener_usuarios as
	select 
	u.*, e.empleo, 
	coalesce(
	(
		coalesce((select sum (m.monto) from movimientos m where m.usuario_id = u.id and m.tipo = 'Ingreso'), 0)
		-
		coalesce((select sum (m.monto) from movimientos m where m.usuario_id = u.id and m.tipo = 'Retiro'), 0)
	),0) saldo 
	from usuarios u inner join empleos e on e.id = u.empleo_id order by u.id;


	
create or replace view obtener_empleos as
	select * from empleos order by empleos.id;




create or replace procedure insertar_usuario(
	nombre varchar(60),
	apellido varchar(60),
	correo varchar(255),
	direccion varchar(255),
	empleo_id int
)
language plpgsql    
as $$
begin
	insert into usuarios (nombre, apellido, correo,direccion, empleo_id) values (nombre, apellido, correo, direccion, empleo_id);
end $$;

create or replace procedure insertar_empleo(
	empleo varchar(60)
)
language plpgsql    
as $$
begin
	insert into empleos (empleo) values (empleo);
end $$;

create or replace procedure insertar_movimiento(
	tipo varchar(60),
	monto float,
	usuario_id int
)
language plpgsql    
as $$
begin
	insert into movimientos (tipo, monto, usuario_id) values (tipo, monto, usuario_id);
end $$;


create or replace procedure delete_usuario(
	pk int
)
language plpgsql    
as $$
begin
	delete from usuarios where id=pk;
end $$;

create or replace procedure delete_empleo(
	pk int
)
language plpgsql    
as $$
begin
	delete from empleos where id=pk;
end $$;



create or replace procedure update_usuario(
	nombreN varchar(60),
	apellidoN varchar(60),
	direccionN varchar(255),
	correoN varchar(255),
	empleo_idN int,
	pk int
)
language plpgsql    
as $$
begin
	update usuarios set nombre = nombreN, apellido = apellidoN, direccion = direccionN, correo = correoN, empleo_id = empleo_idN where id=pk;
end $$;



create or replace procedure update_empleo(
	empleoN varchar(60),
	pk int
)
language plpgsql    
as $$
begin
	update empleos set empleo = empleoN where id=pk;
end $$;


alter table usuarios add CONSTRAINT usuarios_correo_key unique(correo);

alter table usuarios drop CONSTRAINT usuarios_correo_key;

create or replace view check_unique
as 
SELECT con.conname
    FROM pg_catalog.pg_constraint con
        INNER JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid
        INNER JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
        WHERE nsp.nspname = 'public' and con.conname = 'usuarios_correo_key'
             AND rel.relname = 'usuarios';





call insertar_empleo('test')
call insertar_usuario('test','test2','test3','test4',1)
select * from obtener_empleos
select * from obtener_usuarios





