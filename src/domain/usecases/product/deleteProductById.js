class DeleteProductById {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ idProduct }) {
    if (!idProduct) {
      throw new Error('ID é obrigatorio!')
    }

    const productFinded = await this.productRepository.getProductById(idProduct)
    if (!productFinded) throw new Error('Produto não encontrado!')

    const response = await this.productRepository.deleteProductById(idProduct)
    return response
  }
}

module.exports = DeleteProductById
