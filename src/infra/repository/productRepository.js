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

  async getAllProductsByFilter(filter = {}) {
    const product = await this.productRepository.find(filter)
    return product
  }

  async getProductById(idProduct) {
    const product = await this.productRepository.findOne({ _id: idProduct })
    return product
  }

  async deleteProductById(idProduct) {
    const product = await this.productRepository.deleteOne({ _id: idProduct })
    return product
  }
}

module.exports = new ProductRepository()
