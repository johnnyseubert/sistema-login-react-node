// Imports
const express = require("express");
const routes = require('./routes')
const db = require('./database')
const cors = require('cors')
const server = express();

server.use(cors({
    origin: '*'
}))
// Middlewares
server.use(express.json());
server.use('/api', routes);
db.sync().then(() => console.log("Banco conectado com sucesso!"));

// Servidor
server.listen(3333, () => console.log("Servidor rodando http://localhost:3333"));