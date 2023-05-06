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
    total,
    metadata
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
      total,
      metadata
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

  async getOrderById(id) {
    const order = await this.orderRepository.findById(id).lean()
    return order
  }

  async updateStatusById({ orderId, status }) {
    const filter = { _id: orderId }
    const order = await this.orderRepository
      .updateOne(filter, {
        status: status
      })
      .lean()
    return order
  }

  async getOrdersByFilter(filter = {}) {
    const order = await this.orderRepository.find(filter).lean()
    return order
  }
}

module.exports = new OrderRepository()
