const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT = process.env.SALT
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT
const UserRepository = require('../model/user')

class UserController {
  async create(req, res) {
    const { name, email, birthDate, cpf, password, confirmPassword } = req.body
    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'As senhas não conferem' })
    }

    if (
      !name ||
      !email ||
      !birthDate ||
      !cpf ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).send({ error: 'Todos os campos são obrigatorios' })
    }

    const filter = {
      $or: [{ email: email }, { cpf: cpf }]
    }
    const userFinded = await UserRepository.find(filter)
    if (userFinded.length > 0) {
      return res.status(400).send({ error: 'Usuário já cadastrado' })
    }

    const hashPassword = bcrypt.hashSync(password, Number(SALT))

    const user = await UserRepository.create({
      name,
      email,
      birthDate,
      cpf,
      password: hashPassword
    })
    res.status(201).send(user)
  }

  async login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).send({ error: 'Email e senha são obrigatorios' })
    }

    const filter = {
      email: email
    }
    const userFinded = await UserRepository.find(filter)
    if (userFinded.length === 0) {
      return res.status(400).send({ error: 'Usuário não cadastrado' })
    }

    const authorized = bcrypt.compareSync(password, userFinded[0].password)
    if (!authorized) {
      return res.status(400).send({ error: 'Senha incorreta' })
    }

    const token = jwt.sign(
      {
        id: userFinded[0]._id,
        email: userFinded[0].email,
        name: userFinded[0].name
      },
      SECRET_KEY_JWT
    )

    res.status(200).send({ token })
  }
}

module.exports = new UserController()
