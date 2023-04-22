class GetOrdersByUser {
  constructor(productRepository, orderRepository) {
    this.productRepository = productRepository
    this.orderRepository = orderRepository
  }

  async execute({ userId }) {
    if (!userId) {
      throw new Error('Id do usuario é obrigatorio')
    }

    let orders = await this.orderRepository.getOrdersByUserId({ userId })
    const productsCode = []

    orders.forEach((order) => {
      order.products.forEach((product) => {
        productsCode.push(product.code)
      })
    })

    const products = await this.productRepository.getAllProductsByFilter({
      code: { $in: productsCode }
    })

    orders = orders.map((order) => {
      order.products = order.products.map((product) => {
        const productFound = products.find(
          (productFind) => productFind.code === product.code
        )
        product.name = productFound.name
        product.price = productFound.price
        product.urlImage = productFound.urlImage
        return product
      })
      return order
    })

    return orders
  }
}

module.exports = GetOrdersByUser
