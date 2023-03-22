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

    const userFinded = await this.userRepository.findByEmail(email)
    if (!userFinded) {
      throw new Error('Usuário não cadastrado')
    }

    const authorized = bcrypt.compareSync(password, userFinded.password)
    if (!authorized) {
      throw new Error('Senha incorreta')
    }

    const token = jwt.sign(
      {
        id: userFinded._id,
        email: userFinded.email,
        name: userFinded.name,
        permission: userFinded?.permission,
        genre: userFinded?.genre
      },
      SECRET_KEY_JWT
    )

    return token
  }
}

module.exports = AuthenticateUser
