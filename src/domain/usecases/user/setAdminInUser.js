class SetAdminInUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id }) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('Usuário não encontrado')
    }
    if (user.permission.includes('ADMIN')) {
      throw new Error('Usuário já é administrador')
    }

    const body = { permission: [...user.permission, 'ADMIN'] }
    await this.userRepository.updateById({ id, body })
    return { message: 'Usuário atualizado com sucesso!' }
  }
}

module.exports = SetAdminInUser
