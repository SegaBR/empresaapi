create table fornecedores (
codigo serial not null primary key,
nome varchar(50) not null, 
cnpj varchar(18) not null,
telefone varchar(14) not null,
cep varchar(9) not null);

create table mercadorias (
codigo serial not null primary key, 
nome varchar(50) not null, 
preco_custo double precision not null,
preco_venda double precision not null,
estoque double precision not null,
fornecedor integer not null, 
foreign key (fornecedor) references fornecedores (codigo));


-- inserir alguns registros
insert into fornecedores (nome, cnpj, telefone, cep) values ('Fornecedor 1 LTDA' , '11.759.739/0001-06', '(31)99580-0141', '31742-073') , 
('Fornecedor 2 LTDA' , '56.629.290/0001-91', '(54)99810-7844', '88762-083'), ('Fornecedor 3 LTDA' , '05.543.290/0001-33', '(61)98222-5555', '72215-080');

insert into mercadorias (nome, preco_custo, preco_venda, estoque, fornecedor) values
('Produto 1', 10.00, 30.00, 30, 1),
('Produto 2', 25.60, 69.99, 20, 2);