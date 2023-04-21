const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT

class AuthenticateSocialUser {
  constructor(userRepository, registerSocialUser) {
    this.userRepository = userRepository
    this.registerSocialUser = registerSocialUser
  }

  async execute({ email, name, typeLogin }) {
    if (!email || !name || !typeLogin) {
      throw new Error('Email ou nome ou typeLogin são obrigatorios')
    }

    let userFinded = await this.userRepository.findByEmail(email)

    if (!userFinded) {
      switch (typeLogin) {
        case 'facebook':
          userFinded = await this.registerSocialUser.execute({
            name,
            email,
            typeLogin
          })
          break
        default:
          throw new Error('Tipo de login inválido')
      }
    }

    const token = jwt.sign(
      {
        id: userFinded._id,
        email: userFinded.email,
        name: userFinded.name,
        permission: userFinded?.permission,
        typeLogin: userFinded?.typeLogin
      },
      SECRET_KEY_JWT
    )

    return token
  }
}

module.exports = AuthenticateSocialUser
