const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.get('/users', UserController.getAll)
route.get('/users/:id', UserController.getOne)
route.post('/users', UserController.createOne)
route.put('/users/:id', UserController.updateOne)
route.delete('/users/:id', UserController.deleteOne)

route.post('/verificarLogin', UserController.verificarLogin)

module.exports = route;