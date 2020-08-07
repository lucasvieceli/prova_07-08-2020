# Sobre

Utilizei para fazer esse projeto, 

 - Angular 10 (frontend)
 - NestJs (backend)
 - TypeORM (com migrations)
 - Mysql
 - Docker

Temos os seguintes módulos no backend:
 #### Auth
Módulo que cuida da parte de registrar usuários e login no sistema, contendo as rotas:
 - auth/login
 - auth/register
 - /auth/forgot-password
 - /auth/forgot-password/update

Todas as rotas possui validação de formulário
#### People
No momento não possui rotas, tem somente um service 
#### Product
Módulo dos produtos no sistema, contendo as rotas:
 - /product
 - /product/:id
 - /product/report
#### Upload
Módulo de uploads de arquivos, contendo a rota:
 - /uploads/:name
---
Nos endpoints de get é obrigatório informar parametro columns, isto serve para você informar quais colunas serão buscada do banco de dados, exemplo
"http://localhost:3331/product?page=1&limit=25&columns=id,name,minimumStock,currentStock"
Caso essa tabela tenha muitos registros ou joins, você consegue dizer exatamente qual colunas buscar, poupando processamento.

Quando for feito algum Patch e informar o parametro columns, o retorno do endpoint será as colunas dessa entidade que foi modificado, caso não seja informado, tirar retornar um boleano

# Start
Para rodar o projeto basta rodar o comando

```shell
	docker-compose up -d
```

Para visualizar logs 
```shell
	docker logs app_frontend
	docker logs app_backend
```

Url para acessar front end: [http://localhost:3330/](http://localhost:3330/)  

Url do backend [http://localhost:3331/](http://localhost:3331/)