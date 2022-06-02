const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const { Op } = require('sequelize')

module.exports = {
    async getAll(req, res) {
        try {
            let users = await User.findAll();
            res.status(200).json({
                message: "Usuarios buscados com sucesso",
                status: "S",
                users
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    },
    async getOne(req, res) {
        try {

            let id = req.params.id
            let user = await User.findByPk(id)

            res.status(200).json({
                message: "Usuario encontrado com sucesso",
                status: "S",
                user
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    },
    async createOne(req, res) {
        try {

            let { nome, email, senha, nivel } = req.body;

            let userExists = await User.findOne({
                where: {
                    nome: {
                        [Op.eq]: nome.toLowerCase()
                    }
                }
            })

            if (!userExists) {
                //Criptografar a senha 
                // o 10 é o nivel de segurança de hash
                const senhaCriptografada = await bcrypt.hash(senha, 10) // o parametro hash é a senha já criptografada

                let user = await User.create({
                    nome: nome.toLowerCase(), email: email.toLowerCase(), senha: senhaCriptografada, nivel: nivel.toUpperCase()
                })

                res.status(200).json({
                    message: "Usuario criado com sucesso",
                    status: "S",
                    user
                })

            } else {
                res.status(500).json({
                    message: "Já existe um usuário com este nome",
                    status: "E"
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    },
    async updateOne(req, res) {
        try {
            let id = parseInt(req.params.id);
            let user = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                nivel: req.body.nivel
            }

            await User.update(user, {
                where: {
                    id: id
                }
            })

            res.status(200).json({
                message: "Usuário atualizado com sucesso",
                status: "S",
                usuarioAtualizado: {
                    id: id,
                    nome: user.nome,
                    email: user.email,
                    senha: user.senha,
                    nivel: user.nivel
                }
            })

        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    },
    async deleteOne(req, res) {
        try {
            let userId = parseInt(req.params.id);

            await User.destroy({
                where: {
                    id: userId
                }
            })

            res.status(200).json({
                message: "Usuario excluido com sucesso",
                status: "S"
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    },
    async verificarLogin(req, res) {
        try {
            let { username, senha } = req.body;

            let dbUser = await User.findOne({
                where: {
                    nome: {
                        [Op.eq]: username.toLowerCase()
                    }
                }
            })

            // Verifica se as senhas criptografadas são iguais
            const match = await bcrypt.compare(senha, dbUser.senha);

            if (match == true) {
                res.status(200).json({
                    message: "Usuário autenticado com sucesso!",
                    status: "S",
                    username: dbUser.nome
                })
            } else {
                res.status(200).json({
                    message: "Username / senha inválidos",
                    status: "N"
                })
            }

        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: "E"
            })
        }
    }
}