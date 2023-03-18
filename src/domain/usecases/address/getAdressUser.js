class GetAddressUser {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }

  async execute({ userId }) {
    if (!userId) {
      throw new Error('userId é obrigatório')
    }
    const address = await this.addressRepository.getAddressByUserId({ userId })

    return address
  }
}

module.exports = GetAddressUser
