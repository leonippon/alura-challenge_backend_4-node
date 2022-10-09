const database = require('../db/models/index.js');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const saltRounds = 10;

class UserController {

    // CREATE
    static async createUser(req, res) {
        if (req.body.username !== "" && req.body.password !== "")
            {
            try {
                const user = await database.User.findOne({ where: { username: req.body.username } });
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                if (!!user) {
                    return res.status(400).json({ "message": "Nome de usuário já está em uso!" });
                } else {
                    try {
                        const newUser = await database.User.create({
                            username: req.body.username,
                            password: hash
                        });
                        return res.status(200).json(newUser);
                    } catch (error) {
                        return res.status(500).json(error.message);
                    }
                }} catch (error) {
                    return res.status(500).json(error.message);
            }
        } else {
            return res.status(400).json({ "message": "Nome de usuário ou senha em branco!" });
        }
    }

    // READ
    static async loginUser(req, res) {
        try {
            const user = await database.User.findOne({ where: { username: req.body.username }});
            if (!!user) {
                const hash = await bcrypt.compare(req.body.password, user.password);
                if (hash) {
                    const token = jwt.sign(
                        { id: user.id },
                        process.env.API_SECRET, 
                        { expiresIn: 81810 }
                    );
                    return res.status(200).send({ "message": `Usuário ${req.body.username} logado com sucesso!` , token: token });
                } else {
                    return res.status(400).send({ "message": "Nome de usuário ou senha incorretos!", token: null });
                }                
            } else {
                return res.status(400).send({ "message": "Nome de usuário ou senha incorretos!", token: null });
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // UPDATE USER
    static async updateUser(req, res) {
        try {
            const user = await database.User.findOne({ where: { username: req.body.username }});
            console.log(user.body);
            if (!!user) {
                const hash = await bcrypt.compare(req.body.password, user.password);
                console.log(hash)
                if (hash) {
                    const newHash = await bcrypt.hash(req.body.new_password, saltRounds);
                    try {
                        await database.User.update({ password: newHash }, { where: { username: req.body.username }});
                    } catch (error) {
                        return res.status(500).json(error.message);
                    }
                    return res.status(200).json({ "message": `Usuário ${req.body.username} atualizado com sucesso!` });
                } else {
                    return res.status(400).json({ "message": "Nome de usuário ou senha incorretos!"});
                }                
            } else {
                return res.status(400).json({ "message": "Nome de usuário ou senha incorretos!"});
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // DELETE
    static async deleteUser(req, res) {
        try {
            const user = await database.User.findOne({ where: { username: req.body.username }});
            if (!!user) {
                const hash = await bcrypt.compare(req.body.password, user.password);
                if (hash) {
                    await database.User.destroy({ where: { username: req.body.username } });
                    return res.status(200).json({ "message": `Usuário ${req.body.username} excluído com sucesso!` });
                } else {
                    return res.status(400).json({ "message": "Nome de usuário ou senha incorretos!"});
                }                
            } else {
                return res.status(400).json({ "message": "Nome de usuário ou senha incorretos!"});
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = UserController;