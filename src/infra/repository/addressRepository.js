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
}

module.exports = new AddressRepository()
