class GetAllProducts {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute() {
    const products = await this.productRepository.getAllProductsByFilter()
    return products
  }
}

module.exports = GetAllProducts
