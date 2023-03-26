class addTechnicalInformation {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute({ idProduct, technicalInformation = [] }) {
    if (!idProduct || !technicalInformation.length) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const productFinded = await this.productRepository.getProductById(idProduct)

    if (!productFinded) {
      throw new Error('Produto não encontrado')
    }
    if (!productFinded.technicalInformation) {
      productFinded.technicalInformation = []
    }
    const body = {
      technicalInformation: [
        ...productFinded?.technicalInformation,
        ...technicalInformation
      ]
    }
    const product = await this.productRepository.updateProductById(
      idProduct,
      body
    )
    return product
  }
}

module.exports = addTechnicalInformation
