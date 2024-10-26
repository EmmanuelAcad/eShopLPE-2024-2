create table produtoras (
   codigo serial not null primary key, 
   nome varchar (30) not null,
   sede varchar(30) not null
);

create table jogos (
	codigo serial not null primary key,
	titulo varchar(30) not null,
	genero varchar(30) not null,
	preco decimal(5,2) not null,
	produtora integer not null,
	foreign key (produtora) references produtoras (codigo)
);

insert into produtoras (nome, sede) values
('FromSoftware', 'Tóquio, Japão'),
('Valve', 'Bellevue, Washington, EUA'),
('Capcom', 'Osaka, Japão')
returning codigo, nome, sede;

insert into jogos (titulo, genero, preco, produtora) values
('Elden Ring', 'Ação, RPG', 249.90, 1),
('Dark Souls III', 'Ação', 257.90, 1),
('Dota 2', 'Ação, Estratégia', 0, 2),
('Portal 2', 'Ação, Aventura', 32.99, 2),
('Monster Hunter Rise', 'Ação', 139.90, 3)
returning codigo, titulo, genero, preco, produtora;
