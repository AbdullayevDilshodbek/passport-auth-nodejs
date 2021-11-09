
const { User } = require('../models')
const dot = require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports.register = async (req, res) => {
    try {
        const { full_name, username, password } = req.body
        const hash = await bcrypt.hash(password.toString(), await bcrypt.genSalt(10))
        const user = await User.create({
                    full_name,
                    username,
                    password: hash,
                    active: 0
                })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register',)
    }
}

module.exports.index = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password']
              }
        });
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
}