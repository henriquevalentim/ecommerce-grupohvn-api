class DeleteUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ userId }) {
    if (!userId) {
      throw new Error('Id do usuário não informado!')
    }
    const response = await this.userRepository.deleteUserById({ userId })
    return response
  }
}

module.exports = DeleteUser
