const SALT = process.env.SALT
const bcrypt = require('bcrypt')

class RegisterUser {
  constructor(userRepository, authenticateUser) {
    this.userRepository = userRepository
    this.authenticateUser = authenticateUser
  }

  async execute({ name, email, birthDate, cpf, password, confirmPassword }) {
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

    const filter = {
      $or: [{ email: email }, { cpf: cpf }]
    }
    const userFinded = await this.userRepository.find(filter)
    if (userFinded.length > 0) {
      if (userFinded[0].email === email) {
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
      password: hashPassword
    })
    const token = this.authenticateUser.execute({ email, password })
    return token
  }
}

module.exports = RegisterUser
