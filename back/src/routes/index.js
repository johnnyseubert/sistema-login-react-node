const route = require('express').Router()
const UserController = require('../controllers/UserController')
const ReportController = require('../controllers/ReportController')

// Dados
route.get('/users', UserController.getAll)
route.get('/users/:id', UserController.getOne)
route.post('/users', UserController.createOne)
route.put('/users/:id', UserController.updateOne)
route.delete('/users/:id', UserController.deleteOne)

// Login
route.post('/verificarLogin', UserController.verificarLogin)

//Relatório
route.get('/report/users', ReportController.UsersReport)

module.exports = route;