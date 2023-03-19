class UpdateUserData {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id, name, email, birthDate, cpf, genre }) {
    const body = {}
    if (name) body.name = name
    if (email) body.email = email
    if (birthDate) body.birthDate = birthDate
    if (cpf) body.cpf = cpf
    if (genre) body.genre = genre

    await this.userRepository.updateById({ id, body })
    return { message: 'Usuário atualizado com sucesso!' }
  }
}

module.exports = UpdateUserData
