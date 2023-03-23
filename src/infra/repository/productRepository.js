const productSchema = require('../schema/product')

class ProductRepository {
  constructor() {
    this.productRepository = productSchema
  }

  async create({ name, code, price, type, quantity, urlImage, status }) {
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

  async getProductByCode({ code }) {
    const filter = { code: code }
    const product = await this.productRepository.findOne(filter)
    return product
  }
}

module.exports = new ProductRepository()
