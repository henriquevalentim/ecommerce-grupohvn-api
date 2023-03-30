class GetAllProducts {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ code }) {
    const product = await this.productRepository.getProductByCode({ code })
    return product
  }
}

module.exports = GetAllProducts
