const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT

class AuthenticateUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatorios')
    }

    const filter = {
      email: email
    }
    const userFinded = await this.userRepository.find(filter)
    if (userFinded.length === 0) {
      throw new Error('Usuário não cadastrado')
    }

    const authorized = bcrypt.compareSync(password, userFinded[0].password)
    if (!authorized) {
      throw new Error('Senha incorreta')
    }

    const token = jwt.sign(
      {
        id: userFinded[0]._id,
        email: userFinded[0].email,
        name: userFinded[0].name
      },
      SECRET_KEY_JWT
    )

    return token
  }
}

module.exports = AuthenticateUser
