const userModel = require('../../infra/model/user')

class UserRepository {
  constructor() {
    this.userRepository = userModel
  }

  async create({ name, email, birthDate, cpf, password, genre }) {
    const user = await this.userRepository.create({
      name,
      email,
      birthDate,
      cpf,
      password,
      genre
    })
    return user
  }

  async findByEmail(email) {
    const filter = {
      email: email
    }
    const user = await this.userRepository.findOne(filter)
    return user
  }

  async findByEmailOrCpf({ email, cpf }) {
    const filter = {
      $or: [{ email: email }, { cpf: cpf }]
    }
    const user = await this.userRepository.findOne(filter)
    return user
  }
}

module.exports = new UserRepository()
