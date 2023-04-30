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

  async getOrdersByUserId({ userId }) {
    const filter = {
      userId
    }
    const order = await this.orderRepository.find(filter).lean()
    return order
  }

  async getOrdersByFilter(filter = {}) {
    const order = await this.orderRepository.find(filter).lean()
    return order
  }
}

module.exports = new OrderRepository()
