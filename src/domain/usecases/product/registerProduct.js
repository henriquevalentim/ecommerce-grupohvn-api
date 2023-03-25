class RegisterProduct {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ name, code, price, type, quantity, urlImage, status }) {
    if (!name || !code || !price || !type || !quantity || !urlImage) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const productExists = await this.productRepository.getProductByCode({
      code
    })

    if (productExists) {
      throw new Error('Produto já cadastrado')
    }

    const product = await this.productRepository.create({
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
