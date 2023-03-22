class UpdateAddress {
  constructor(addressRepository) {
    this.addressRepository = addressRepository
  }

  async execute({
    name,
    zipCode,
    street,
    number,
    neighborhood,
    city,
    uf,
    complement,
    idAddress
  }) {
    if (!idAddress) {
      throw new Error('idAddress é obrigatório')
    }

    const body = {}

    if (name) body.name = name
    if (zipCode) body.zipCode = zipCode
    if (street) body.street = street
    if (number) body.number = number
    if (neighborhood) body.neighborhood = neighborhood
    if (city) body.city = city
    if (uf) body.uf = uf
    if (complement) body.complement = complement

    const address = await this.addressRepository.updateAddressById({
      idAddress,
      body
    })

    return address
  }
}

module.exports = UpdateAddress
