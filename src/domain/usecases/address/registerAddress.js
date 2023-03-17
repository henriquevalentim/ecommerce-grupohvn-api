class RegisterAddress {
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
    userId,
    isMain = false
  }) {
    if (
      !name ||
      !zipCode ||
      !street ||
      !number ||
      !neighborhood ||
      !city ||
      !uf ||
      !userId
    ) {
      throw new Error('Todos os dados são obrigatórios')
    }
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

module.exports = RegisterAddress
