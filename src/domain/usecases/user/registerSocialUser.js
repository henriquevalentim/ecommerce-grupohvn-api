const bcrypt = require('bcrypt')
const NodeMailer = require('../../../main/adapters/nodemailer')
const SALT = process.env.SALT

class RegisterSocialUser {
  constructor(userRepository, authenticateUser) {
    this.userRepository = userRepository
    this.authenticateUser = authenticateUser
  }

  async execute({ name, email, typeLogin }) {
    if (!name || !email || !typeLogin) {
      throw new Error('Todos os campos são obrigatorios')
    }

    const userFinded = await this.userRepository.findByEmail(email)

    if (userFinded) {
      throw new Error('Email já cadastrado')
    }

    const user = await this.userRepository.create({
      name,
      email,
      typeLogin
    })

    await NodeMailer.sendWelcomeEmail({
      to: email,
      subject: 'Bem vindo ✔',
      name
    })

    return user
  }
}

module.exports = RegisterSocialUser
