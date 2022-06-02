### Api para uso de aulas

Utilizado Banco SQLITE, se encontra dentro de src/database/db.sqlite (precisa iniciar o projeto para criar o banco);

Buscar todos os usuarios GET:`http://localhost:3333/api/users`
Buscar um usuario GET:`http://localhost:3333/api/users/1`

---

Criar um usuario POST: `http://localhost:3333/api/users`

```json
{
  "nome": "",
  "email": "",
  "senha": "",
  "nivel": ""
}
```

---

Atualizar um usuario PUT: `http://localhost:3333/api/users/ID`

```json
{
  "nome": "",
  "email": "",
  "senha": "",
  "nivel": ""
}
```

---

Deletar um usuario DELETE: `http://localhost:3333/api/users/ID`

---

Verificar login: POST: `http://localhost:3333/api/verificarLogin`
```json
{
  "nome": "",
  "senha": ""
}
```