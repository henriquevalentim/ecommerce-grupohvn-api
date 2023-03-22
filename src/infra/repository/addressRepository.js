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

  async updateAddressById({ idAddress, body }) {
    const address = await this.addressRepository.updateOne(
      { _id: idAddress },
      body
    )
    return address
  }

  async deleteAddressById({ idAddress }) {
    const address = await this.addressRepository.deleteOne({
      _id: idAddress
    })
    return address
  }

  async getAddressByUserId({ userId }) {
    const filter = { userId: userId }
    const address = await this.addressRepository.find(filter)
    return address
  }

  async updateMainAddress({ addressId, status }) {
    const filter = { _id: addressId }
    const address = await this.addressRepository
      .updateOne(filter, {
        isMain: status
      })
      .lean()
    return address
  }
}

module.exports = new AddressRepository()
