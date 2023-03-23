const ProductRepository = require('../../infra/repository/productRepository')
const RegisterProduct = require('../../domain/usecases/product/registerProduct')

class ProductController {
  async create(req, res) {
    try {
      const { name, code, price, type, quantity, urlImage, status } = req.body
      const registerProduct = new RegisterProduct(ProductRepository)
      const product = await registerProduct.execute({
        name,
        code,
        price,
        type,
        quantity,
        urlImage,
        status
      })

      return res.status(200).json(product)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new ProductController()
