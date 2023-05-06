const ProductRepository = require('../../infra/repository/productRepository')
const RegisterProduct = require('../../domain/usecases/product/registerProduct')
const GetAllProducts = require('../../domain/usecases/product/getAllProducts')
const GetProductByCode = require('../../domain/usecases/product/getProductByCode')
const DeleteProductById = require('../../domain/usecases/product/deleteProductById')
const AddTechnicalInformation = require('../../domain/usecases/product/addTechnicalInformation')
const GetProductsByCodes = require('../../domain/usecases/product/getProductsByCodes')
const UpdateProduct = require('../../domain/usecases/product/updateProduct')

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

  async update(req, res) {
    try {
      const { id } = req.params
      const { name, code, price, type, quantity, urlImage, status } = req.body
      const updateProduct = new UpdateProduct(ProductRepository)
      const product = await updateProduct.execute({
        id,
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

  async getProductByCode(req, res) {
    try {
      const { code } = req.params
      const getProductByCode = new GetProductByCode(ProductRepository)
      const product = await getProductByCode.execute({ code })

      return res.status(200).json(product)
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

  async getProductsByCodes(req, res) {
    try {
      const { codes = [] } = req.body
      const getProductsByCodes = new GetProductsByCodes(ProductRepository)

      const products = await getProductsByCodes.execute({
        codes
      })

      return res.status(200).json(products)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new ProductController()
