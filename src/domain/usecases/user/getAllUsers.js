class GetAllUsers {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute() {
    const users = await this.userRepository.findAllUser()
    return users
  }
}

module.exports = GetAllUsers
