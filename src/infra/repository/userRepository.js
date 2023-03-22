const userSchema = require('../schema/user')

class UserRepository {
  constructor() {
    this.userRepository = userSchema
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

  async findById(id) {
    const user = await this.userRepository.findById(id).lean()
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

  async findAllUser() {
    const user = await this.userRepository.find({}).lean()
    return user
  }

  async updateById({ id, body }) {
    const filter = {
      _id: id
    }
    const user = await this.userRepository.updateOne(filter, body)
    return user
  }
}

module.exports = new UserRepository()
