const userSchema = require('../schema/user')

class UserRepository {
  constructor() {
    this.userRepository = userSchema
  }

  async create({
    name,
    email,
    birthDate,
    cpf,
    password,
    genre,
    typeLogin = 'email'
  }) {
    const user = await this.userRepository.create({
      name,
      email,
      birthDate,
      cpf,
      password,
      genre,
      typeLogin
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
    const user = await this.userRepository.findOne(filter).lean()
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

  async getUsersByFilter(filter = {}) {
    const user = await this.userRepository.find(filter).lean()
    return user
  }

  async updateById({ id, body }) {
    const filter = {
      _id: id
    }
    const user = await this.userRepository.updateOne(filter, body)
    return user
  }

  async deleteUserById({ userId }) {
    const filter = {
      _id: userId
    }
    const response = await this.userRepository.deleteOne(filter)
    return response
  }
}

module.exports = new UserRepository()
