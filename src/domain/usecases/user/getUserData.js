class GetUserData {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id }) {
    if (!id) {
      throw new Error('Id é obrigatório')
    }

    const userFinded = await this.userRepository.findById(id)
    if (!userFinded) {
      throw new Error('Usuário não cadastrado')
    }
    delete userFinded.password
    return userFinded
  }
}

module.exports = GetUserData
