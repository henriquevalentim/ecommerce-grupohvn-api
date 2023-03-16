const bcrypt = require('bcrypt')
const NodeMailer = require('../../../main/adapters/nodemailer')
const SALT = process.env.SALT
class RegisterUser {
  constructor(userRepository, authenticateUser) {
    this.userRepository = userRepository
    this.authenticateUser = authenticateUser
  }

  async execute({
    name,
    email,
    birthDate,
    cpf,
    password,
    confirmPassword,
    genre
  }) {
    if (password !== confirmPassword) {
      throw new Error('As senhas não conferem')
    }

    if (
      !name ||
      !email ||
      !birthDate ||
      !cpf ||
      !password ||
      !confirmPassword
    ) {
      throw new Error('Todos os campos são obrigatorios')
    }

    const userFinded = await this.userRepository.findByEmailOrCpf({
      email,
      cpf
    })

    if (userFinded) {
      if (userFinded.email === email) {
        throw new Error('Email já cadastrado')
      }
      throw new Error('CPF já cadastrado')
    }

    const hashPassword = bcrypt.hashSync(password, Number(SALT))

    await this.userRepository.create({
      name,
      email,
      birthDate,
      cpf,
      password: hashPassword,
      genre
    })

    const subject = 'Bem vindo ✔'

    await NodeMailer.sendWelcomeEmail({ to: email, subject, name })

    const token = this.authenticateUser.execute({ email, password })
    return token
  }
}

module.exports = RegisterUser
