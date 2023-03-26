const ProductRepository = require('../../infra/repository/productRepository')
const RegisterProduct = require('../../domain/usecases/product/registerProduct')
const GetAllProducts = require('../../domain/usecases/product/getAllProducts')
const DeleteProductById = require('../../domain/usecases/product/deleteProductById')
const AddTechnicalInformation = require('../../domain/usecases/product/AddTechnicalInformation')

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

  async getAllProducts(req, res) {
    try {
      const getAllProducts = new GetAllProducts(ProductRepository)
      const products = await getAllProducts.execute()

      return res.status(200).json(products)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async deleteProductById(req, res) {
    try {
      const { idProduct } = req.params
      const deleteProductById = new DeleteProductById(ProductRepository)
      const products = await deleteProductById.execute({
        idProduct
      })

      return res.status(200).json(products)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async addTechnicalInformation(req, res) {
    try {
      const { idProduct } = req.params
      const { technicalInformation } = req.body
      const addTechnicalInformation = new AddTechnicalInformation(
        ProductRepository
      )

      const products = await addTechnicalInformation.execute({
        idProduct,
        technicalInformation
      })

      return res.status(200).json(products)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new ProductController()
