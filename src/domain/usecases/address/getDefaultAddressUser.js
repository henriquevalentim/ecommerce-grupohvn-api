class GetDefaultAddressUser {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }

  async execute({ userId }) {
    if (!userId) {
      throw new Error('userId é obrigatório')
    }
    const address = await this.addressRepository.getDefaultAddressUser({
      userId
    })

    return address
  }
}

module.exports = GetDefaultAddressUser
