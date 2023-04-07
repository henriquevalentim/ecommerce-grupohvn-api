class GetProductsByCodes {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ codes }) {
    const filter = {
      code: { $in: codes }
    }
    const products = await this.productRepository.getAllProductsByFilter(filter)
    return products
  }
}

module.exports = GetProductsByCodes
