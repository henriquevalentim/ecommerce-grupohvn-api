class UpdateMainAddress {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }

  async execute({ userId, addressId }) {
    if (!userId) {
      throw new Error('userId é obrigatório')
    }
    const address = await this.addressRepository.getAddressByUserId({ userId })
    if (address.length) {
      const addressFinded = address.find((item) => item.isMain)
      await this.addressRepository.updateMainAddress({
        addressId: addressFinded._id,
        status: false
      })
      await this.addressRepository.updateMainAddress({
        addressId: addressId,
        status: true
      })
    }

    return { message: 'Endereço principal atualizado com sucesso' }
  }
}

module.exports = UpdateMainAddress
