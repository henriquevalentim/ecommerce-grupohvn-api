class DeleteAddress {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }

  async execute({ idAddress }) {
    if (!idAddress) {
      throw new Error('O idAddress é obrigatório')
    }

    const address = await this.addressRepository.getAddressById({ idAddress })
    if (!address) {
      throw new Error('Endereço não encontrado')
    }
    if (address.isMain) {
      throw new Error('Não é possível excluir o endereço principal')
    }

    const response = await this.addressRepository.deleteAddressById({
      idAddress
    })

    return response
  }
}

module.exports = DeleteAddress
