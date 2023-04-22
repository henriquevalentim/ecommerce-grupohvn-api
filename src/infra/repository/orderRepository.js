const orderSchema = require('../schema/order')

class OrderRepository {
  constructor() {
    this.orderRepository = orderSchema
  }

  async create({
    userId,
    addressId,
    sendMethod,
    paymentMethod,
    creditCardId,
    installments,
    status,
    products,
    total
  }) {
    const order = await this.orderRepository.create({
      userId,
      addressId,
      sendMethod,
      paymentMethod,
      creditCardId,
      installments,
      status,
      products,
      total
    })
    return order
  }
}

module.exports = new OrderRepository()
