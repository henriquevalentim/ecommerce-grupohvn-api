class RegisterProduct {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ id, name, code, price, type, quantity, urlImage, status }) {
    if (!id) {
      throw new Error('Id é obrigatório')
    }

    const product = await this.productRepository.updateById({
      id,
      name,
      code,
      price,
      type,
      quantity,
      urlImage,
      status
    })
    return product
  }
}

module.exports = RegisterProduct
