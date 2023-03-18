const addressSchema = require('../schema/address')

class AddressRepository {
  constructor() {
    this.addressRepository = addressSchema
  }

  async create({
    name,
    zipCode,
    street,
    number,
    neighborhood,
    city,
    uf,
    complement,
    userId,
    isMain
  }) {
    const address = await this.addressRepository.create({
      name,
      zipCode,
      street,
      number,
      neighborhood,
      city,
      uf,
      complement,
      userId,
      isMain
    })
    return address
  }

  async getAddressByUserId({ userId }) {
    const filter = { userId: userId }
    const address = await this.addressRepository.find(filter)
    return address
  }
}

module.exports = new AddressRepository()
