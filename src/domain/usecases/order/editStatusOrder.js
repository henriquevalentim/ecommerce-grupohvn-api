class EditStatusOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository
  }

  async execute({ orderId, status }) {
    if (!orderId) {
      throw new Error('Id do pedido não informado')
    }
    if (!status) {
      throw new Error('Status não informado')
    }

    let order = await this.orderRepository.getOrderById(orderId)

    if (!order) {
      throw new Error('Pedido não encontrado')
    }

    order.status = status

    await this.orderRepository.updateStatusById({ orderId, status })

    return order
  }
}

module.exports = EditStatusOrder
