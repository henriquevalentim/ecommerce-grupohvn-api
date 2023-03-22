class DeleteAddress {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }

  async execute({ idAddress }) {
    if (!idAddress) {
      throw new Error('O idAddress é obrigatório')
    }

    const response = await this.addressRepository.deleteAddressById({
      idAddress
    })

    return response
  }
}

module.exports = DeleteAddress
